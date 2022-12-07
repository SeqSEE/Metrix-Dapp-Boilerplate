import React from 'react';

import Home from '../views/Home';

import Layout from '../components/layout/Layout';
import { NextPageContext } from 'next';

/*interface HomeProps {
}*/

export default function HomePage(/*props: HomeProps*/): JSX.Element {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  return {};
};
