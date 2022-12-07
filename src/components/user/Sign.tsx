import React from 'react';
import { Button, Icon, Segment, SemanticICONS } from 'semantic-ui-react';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { authService } from '../../services/auth.service';
import getChainFromId from '../../helpers/getChainFromId';
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError
} from '@web3-react/injected-connector';
import { getErrorMessage } from '../../pages/_app';

interface SignProps {
  session: string;
  loading: boolean;
  callback: (loaded: boolean, cancel: boolean) => void;
  click: (busy: boolean) => void;
}

export default function Sign(props: SignProps): JSX.Element {
  // eslint-disable-next-line
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 97]
  });
  // eslint-disable-next-line
  const context: Web3ReactContextInterface<any> = useWeb3React();

  const { connector, library, chainId, account, activate, active } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  const [web3Error, setWeb3Error] = React.useState('');
  React.useEffect(() => {
    if (web3Error && web3Error.length > 0) {
      setWeb3Error(web3Error);
    }
  }, [web3Error, setWeb3Error]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(['metriverse-user']);

  const [session, setSessionState] = useState(props.session);

  React.useEffect(() => {
    setSessionState(session);
  }, [session, setSessionState]);

  const [loading, setLoading] = useState(props.loading);

  React.useEffect(() => {
    setLoading(loading);
    props.click(loading);
  }, [loading, setLoading, props]);

  async function processSigning() {
    if (!!!account || !chainId) {
      return;
    }
    const chain = getChainFromId(chainId);
    if (chain === 'UNKNOWN') return;
    let signIn = false;
    const response = await authService.fetchNonce(account, chain);
    // Sign Message
    library
      .getSigner(account)
      .signMessage(response.message)
      /* eslint-disable-next-line */
      .then((signature: any) => {
        // Verify signed Message
        authService
          .verifyMessage({
            signature: signature,
            account,
            chain
          })
          .then((data) => {
            // Set Session Cookie
            setCookie('metriverse-user', data.token, {
              path: '/',
              maxAge: 1800, // Expires after 1hr
              sameSite: true
            });
            setSessionState(data.token);
            setLoading(false);
            signIn = true;
            props.callback(signIn, false);
          });
      }) // eslint-disable-next-line
      .catch((error: any) => {
        // TODO: Handle Error
        console.warn(
          'Failure!' + (error && error.message ? `\n\n${error.message}` : '')
        );
        setLoading(false);
        props.callback(signIn, true);
      });
  }

  const btnText = account && active ? 'Sign Message' : 'Connect to Web3';
  const btnIcon = 'arrow right';

  React.useEffect(() => {
    if (!active) {
      /* eslint-disable-next-line */
      if (!(window as any).ethereum)
        setWeb3Error(getErrorMessage(new NoEthereumProviderError()));
    }
  }, [active]);

  return web3Error.length > 0 ? (
    <Segment>{web3Error}</Segment>
  ) : (
    <Button
      icon={<Icon name={btnIcon as SemanticICONS} />}
      labelPosition="right"
      style={{
        cursor: 'pointer',
        padding: '12px 0px'
      }}
      color="green"
      onClick={async () => {
        setLoading(true);
        if (!active) {
          await activate(injected, (error: Error) => {
            console.log(error);
            if (!(error instanceof UserRejectedRequestError))
              setWeb3Error(getErrorMessage(error));
            setLoading(false);
            props.callback(false, true);
          });
          setLoading(false);
        } else {
          await processSigning();
        }
      }}
      disabled={loading}
      loading={loading}
      content={btnText}
    />
  );
}
