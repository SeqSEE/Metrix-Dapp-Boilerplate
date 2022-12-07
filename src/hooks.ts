import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 97]
});

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false): void {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    // eslint-disable-next-line
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      // eslint-disable-next-line
      const handleChainChanged = (chainId: any) => {
        console.log('chainChanged', chainId);
        activate(injected);
      };

      // eslint-disable-next-line
      const handleAccountsChanged = (accounts: string | any[]) => {
        console.log('accountsChanged', accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      // eslint-disable-next-line
      const handleNetworkChanged = (networkId: any) => {
        console.log('networkChanged', networkId);
        activate(injected);
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }

    // eslint-disable-next-line
    return () => {};
  }, [active, error, suppress, activate]);
}
