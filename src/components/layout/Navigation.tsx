import React from 'react';
import { Grid, Header, Container, Divider, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Network from '../user/NetworkSign';
import { NetworkType } from '@src/types/NetworkType';

export default function NavigationBar(): JSX.Element {
  const [address, setAddress] = React.useState('');

  return (
    <Container className="navigationBar">
      <Grid textAlign="center">
        <Grid.Row className="navigationBarCols">
          <Grid.Column width="4">
            <Link href="/">
              <Header
                as="h1"
                className="navigation nav-header-logo"
                inverted
                style={{
                  backgroundColor: 'transparent'
                }}
                icon
              >
                {/*<Image src="/static/images/logos/logo.svg" size="massive" />*/}
                <Icon name="star outline" />
              </Header>
              <Divider hidden={true} />
              <Header size="large" className="nav-heading" inverted>
                {`${process.env.NEXT_PUBLIC_APP_NAME}`}
              </Header>
            </Link>
          </Grid.Column>
          <Grid.Column width="12">
            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>Menu Item 1</Grid.Column>
                <Grid.Column>
                  <Network
                    address={''}
                    connect={false}
                    onNetworkChanged={(
                      address: string,
                      network: NetworkType,
                      connect: boolean
                    ) => {
                      console.log(`onNetworkChanged={(
                        ${address},
                        ${network},
                        ${connect}
                      )`);
                    }}
                    validated={false}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column>Menu Item 3</Grid.Column>
                <Grid.Column>Menu Item 4</Grid.Column>
              </Grid.Row>
              <Grid.Row columns="equal">
                <Grid.Column>Menu Item 5</Grid.Column>
                <Grid.Column>Menu Item 6</Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
