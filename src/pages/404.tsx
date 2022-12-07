import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Layout from '../components/layout/Layout';
// pages/404.js
export default function Custom404(): JSX.Element {
  return (
    <Layout>
      <Grid padded>
        <Grid.Row stretched textAlign="center">
          <Grid.Column stretched>
            <Header textAlign="center">
              <Header.Content as="h1" className="bgText">
                <br />
                <br />
                404 - Page not found
                <br />
                <br />
                The page or resource you requested could not be found
                <br />
                <br />
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}
