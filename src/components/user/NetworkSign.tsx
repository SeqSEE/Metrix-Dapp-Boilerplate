import { fetchWrapper } from '@src/helpers/FetchWrapper';
import { signMessage } from '@src/util/ContractUtils';
import React from 'react';
import { useCookies } from 'react-cookie';
import {
  Button,
  Label,
  Segment,
  Icon,
  SemanticICONS,
  Grid
} from 'semantic-ui-react';
import { handleMessage } from '../../helpers/HandleMessage';
import NetworkProps from '../../interfaces/NetworkProps';
import { NetworkType } from '../../types/NetworkType';

const defNetork: NetworkType = { type: 'None' };

export default function NetworkSign(props: NetworkProps): JSX.Element {
  const [network, setNetwork] = React.useState(defNetork);
  const [address, setAddress] = React.useState(props.address);
  const [connect, setConnect] = React.useState(props.connect);
  const [connected, setConnected] = React.useState(props.connect);
  const [connecting, setConnecting] = React.useState(props.validated);
  const [validated, setValidated] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [netError, setNetError] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [icon, setIcon] = React.useState('cog' as SemanticICONS);
  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(['metriverse-user']);

  let mounted = false;
  let loading = false;
  const [loaded, setLoaded] = React.useState(loading);
  let timer: NodeJS.Timeout | undefined = undefined;

  React.useEffect(() => {
    if (window) {
      if (
        (window as any).metrimask &&
        (window as any).metrimask.account &&
        (window as any).metrimask.account.loggedIn === true
      )
        setAddress((window as any).metrimask.account.address);
    }
  }, []);

  async function connectWeb3(sign = false) {
    if (window) {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      setLoaded(false);
      setError(false);
      setMessage('');
      if (connect && validated && !connecting) {
        setConnect(false);
        setValidated(false);
        setNetwork(defNetork);
        setSessionCookie('', true);
        props.onNetworkChanged('', { type: 'None' }, false);
        if (process.env.NODE_ENV !== 'production') {
          console.log('Network() Disconnecting MetriMask');
        }
      } else if (sign && !connecting) {
        try {
          const messageNonce = await fetchWrapper.get(
            `/api/auth2/signature/${address}`
          );
          const resp = await signMessage(messageNonce.token);
          //console.log(resp);
          const signResponse = await fetchWrapper.post('/api/auth2/signature', {
            address: resp.result.address,
            signature: resp.result.signature,
            message: resp.result.message
          });
          //console.log(signResponse);
          if (signResponse.success) {
            setValidated(true);
            setSessionCookie(signResponse.token);
          } else {
            setValidated(false);
            setError(true);
            setMessage('Signature Failed!');
          }
        } catch (err: any) {
          setMessage(err.message ? err.message : 'Signature Failed!');
          setError(true);
        }
      } else {
        setConnecting(true);
        setBusy(true);
        if (process.env.NODE_ENV !== 'production') {
          console.log('Network() Connecting MetriMask');
        }
        window.postMessage({ message: { type: 'CONNECT_METRIMASK' } }, '*');
      }
    }
  }

  const setSessionCookie = (jwt: string, clear = false) => {
    if (!clear && jwt) {
      // Set Session Cookie
      setCookie('metriverse-user', jwt, {
        path: '/',
        maxAge: 3600, // Expires after 1hr
        sameSite: true
        //secure: true
      });
    } else if (clear) {
      // Clear Cookie
      setCookie('metriverse-user', JSON.stringify(''), {
        path: '/',
        maxAge: 0,
        sameSite: true
      });
    }
  };

  React.useEffect(() => {
    if (busy && !connecting && !connect) {
      setBusy(true);
      if (timer) {
        clearTimeout(timer);
        if (process.env.NODE_ENV !== 'production') {
          console.log('Network() cleared connect timeout...');
        }
      }
      timer = setTimeout(() => {
        setError(false);
        if (!connect && !connecting) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('Network() resetting connect...');
          }
          setNetwork({ type: 'None' });
          props.onNetworkChanged('', { type: 'None' }, false);
          if (!error) {
            setIcon('user x');
            setMessage('⟶ NACK Provider!');
          }
          setError(true);
          timer = undefined;
        }
      }, 500);
    } else if (busy && connecting) {
      timer = setTimeout(() => {
        setConnecting(false);
        setBusy(false);
        timer = undefined;
      }, 700);
    }
    setConnected(connect);

    return () => {
      if (timer) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`> EFFECT CLEARING: connect ${timer} mounted ${mounted}`);
        }
        clearTimeout(timer);
        timer = undefined;
      }
    };
  }, [connect, connecting]);

  React.useEffect(() => {
    if ((connecting || busy) && !error) {
      setIcon('cog');
    }
  }, [connecting]);

  React.useEffect(() => {
    if (!connecting && connected && !error) {
      location.reload();
    }
  }, [validated]);

  React.useEffect(() => {
    if (error) {
      timer = setTimeout(() => {
        if (!connect && !connecting && error) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('Network() resetting error in state...');
          }
          setBusy(false);
          setError(false);
          setConnecting(false);
          timer = undefined;
        }
      }, 1750);
      return () => {
        if (timer) {
          if (process.env.NODE_ENV !== 'production') {
            console.log(`> EFFECT CLEARING: error ${timer} mounted ${mounted}`);
          }
          clearTimeout(timer);
          timer = undefined;
        }
      };
    }
  }, [error]);

  React.useEffect(() => {
    if (mounted) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Network() Already mounted!');
      }
      return;
    }
    if (!loaded && (window as any).metrimask) {
      connectWeb3();
    }
  }, []);

  React.useEffect(() => {
    if (window as any) {
      window.addEventListener('message', doHandleMessage, false);
    }
    connectWeb3();
    mounted = true;
    return () => {
      console.log(`> UNMOUNTING... mounted ${mounted}`);
      mounted = false;
      window.removeEventListener('message', doHandleMessage);
    };
  }, []);

  function doHandleMessage(message: any): void {
    handleMessage(message, (payload) => {
      handleAccountChanged(payload);
    });
  }

  function handleAccountChanged(data: any): void {
    if (loading && loaded) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('networkChanged abort!  Already loaded..');
      }
      return;
    }
    loading = true;
    setLoaded(!loading);
    setNetError(false);
    if (typeof data === 'undefined') {
      setConnect(false);
      setNetwork({ type: 'None' });
      setAddress('');
      props.onNetworkChanged('', { type: 'None' }, false);
      setError(true);
      setIcon('stop circle outline');
      setMessage('⟶ Logged out!');
      return;
    }
    const account = data.account;
    if (
      account &&
      account.loggedIn &&
      account.network !== process.env.NEXT_PUBLIC_APP_NETWORK
    ) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Network() Network mismatch!');
      }
      setConnect(false);
      setNetwork({ type: account.network });
      setAddress('');
      setSessionCookie('', true);
      setMessage('⟶ NACK - Wrong Network!');
      setIcon('user x');
      setNetError(true);
      setError(true);
      return;
    } else if (account && account.loggedIn) {
      setConnect(true);
      setNetwork({ type: account.network });
      setAddress(account.address);
      props.onNetworkChanged(account.address, { type: account.network }, true);
      if (props.validated) {
        setValidated(true);
        setMessage('⟶ ACK');
      } else {
        setMessage('⟶ Action Required');
      }
      setIcon('play');
      setError(false);
    } else if (!timer) {
      setConnect(false);
      setNetwork({ type: 'None' });
      setAddress('');
      setSessionCookie('', true);
      props.onNetworkChanged('', { type: 'None' }, false);
      setMessage('⟶ NACK Provider!');
      setIcon('user x');
      setError(true);
    }
  }

  function getLabel(): JSX.Element {
    return (
      <span className="net-connect-btn-icon-label">
        {connected ? (
          <Icon name="chain" />
        ) : network.type === 'None' ? (
          <Icon name="exclamation triangle" />
        ) : (
          ''
        )}
        {network.type === 'MainNet'
          ? 'Main Network'
          : network.type === 'TestNet'
          ? 'Test Network'
          : 'Unknown'}
      </span>
    );
  }

  function getConnect(): JSX.Element {
    return (
      <span>
        <span className="net-connect-btn-icon-txt">
          {connecting
            ? 'Connecting...'
            : connected && validated
            ? 'Disconnect'
            : connected && !validated
            ? 'Authenticate'
            : 'Connect'}
        </span>{' '}
        <span className="net-connect-btn-icon">
          {connected && validated ? (
            <Icon name="sign-out" />
          ) : !connected ? (
            <Icon name="play circle outline" />
          ) : connecting ? (
            <Icon name="circle notch" loading />
          ) : (
            <Icon name="sign-in" />
          )}
        </span>
      </span>
    );
  }

  function getStatus(): string | JSX.Element {
    return connecting || busy ? (
      <Label
        className="net-connect-btn"
        style={{ width: '-webkit-fill-available' }}
      >
        <Icon
          name={icon}
          loading={icon === 'cog'}
          color={error ? 'red' : busy ? 'olive' : 'yellow'}
        />
        Establishing Connection &nbsp;
        {message}
      </Label>
    ) : !connected && !connecting ? (
      <Label
        className="net-connect-btn"
        style={{ width: '-webkit-fill-available' }}
      >
        <Icon name="broken chain" color="orange" />
        Read Only <span style={{ color: 'yellow' }}>- </span>
        Network <span style={{ color: 'orange' }}>{network.type}</span>
      </Label>
    ) : !validated ? (
      <Label
        className="net-connect-btn"
        style={{ width: '-webkit-fill-available' }}
      >
        <Icon
          name={icon}
          loading={icon === 'cog'}
          color={error ? 'red' : busy ? 'green' : 'teal'}
        />
        Sign Message &nbsp;
        {message}
      </Label>
    ) : (
      <Label
        className="net-connect-btn"
        style={{ width: '-webkit-fill-available' }}
      >
        <Icon name="check circle" color="green" />
        Connected
      </Label>
    );
  }

  function getNetworkMatch(): string | JSX.Element {
    return netError && network.type !== process.env.NEXT_PUBLIC_APP_NETWORK ? (
      <Label className="net-connect-btn">
        <Icon name="warning sign" color="red" style={{ fontSize: '1.05em' }} />
        Network Mismatch!{' '}
        <span style={{ color: 'orangered' }}>
          Use {process.env.NEXT_PUBLIC_APP_NETWORK}
        </span>
        !
      </Label>
    ) : (
      ''
    );
  }

  return (
    <Grid.Column stretched style={{ width: '-webkit-fill-available' }}>
      <Segment as="div" textAlign="center" className="net-connect-segment">
        <Button fluid labelPosition="left" as="div" style={{ margin: '1px' }}>
          <Label
            as="span"
            className="net-connect-lbl"
            color={connected ? 'green' : !connect ? 'red' : 'purple'}
            pointing="right"
            basic
            style={{ cursor: 'help', minWidth: 'fit-content' }}
            title={
              connected
                ? `Connection to network ${network.type} established.`
                : 'Not Connected..'
            }
          >
            {getLabel()}
          </Label>
          <Button
            className="net-connect-btn-txt"
            color={!connect ? 'violet' : 'purple'}
            inverted
            fluid
            disabled={busy || !connect}
            onClick={() => {
              connectWeb3(true);
            }}
            style={{ padding: '16px 0px', width: '100%' }}
          >
            {getConnect()}
          </Button>
        </Button>
        {getStatus()}
        {getNetworkMatch()}
      </Segment>
    </Grid.Column>
  );
}
