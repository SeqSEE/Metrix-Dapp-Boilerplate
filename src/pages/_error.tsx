import { NextPageContext } from 'next';
import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Layout from '../components/layout/Layout';

function Error(props: { statusCode: number }): JSX.Element {
  return (
    <Layout>
      <Grid padded>
        <Grid.Row stretched textAlign="center">
          <Grid.Column stretched>
            <Header as="h1" textAlign="center">
              <Header.Content className="bgText">
                <br />
                <br />
                {props.statusCode} -
                {props.statusCode === 500
                  ? ' Server-side error occurred'
                  : ' An error occurred'}
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

Error.getInitialProps = (ctx: NextPageContext) => {
  const statusCode = ctx.res
    ? ctx.res.statusCode
    : ctx.err
    ? ctx.err.statusCode
    : 404;
  return { statusCode };
};

export default Error;
