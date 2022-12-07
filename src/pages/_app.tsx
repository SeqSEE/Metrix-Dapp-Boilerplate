import React from 'react';

import '@fontsource/ubuntu/700.css';
import 'semantic-ui-css/semantic.min.css';
import '../styles/responsive.css';
import '../styles/index.css';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { Container } from 'semantic-ui-react';

import { createWeb3ReactRoot, UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
import { ExternalProvider } from '@ethersproject/providers';

export const Web3ReactProviderReloaded = // eslint-disable-next-line
  (process as any).browser && createWeb3ReactRoot('anotherOne');

export function getErrorMessage(error: Error): string {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask or another compatable Web3 extension on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

export function getLibrary(
  provider: ExternalProvider
): ethers.providers.Web3Provider {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

// eslint-disable-next-line
export default function MyApp({ Component, pageProps }: any) {
  return (
    <Container className="app-container">
      <CookiesProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </CookiesProvider>
    </Container>
  );
}
