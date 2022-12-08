import React from 'react';
import {
  Grid,
  Header,
  Container,
  Divider,
  Icon,
  Menu,
  MenuItemProps
} from 'semantic-ui-react';
import Link from 'next/link';
import Network from '../user/NetworkSign';
import { NetworkType } from '@src/types/NetworkType';
import Router from 'next/router';

export default function NavigationBar(): JSX.Element {
  const [activeItem, setActiveItem] = React.useState('dashboard');

  const handleItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: MenuItemProps
  ) => {
    const name = data.name ? data.name : 'dashboard';
    setActiveItem(name);
  };

  return (
    <Container className="navigationBar">
      <Grid textAlign="center">
        <Grid.Row className="navigationBarCols">
          <Grid.Column width="3" style={{ paddingRight: '0px' }}>
            <Link href="/">
              <Header
                as="h3"
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
          <Grid.Column width="13" style={{ paddingLeft: '0px' }}>
            <Grid stretched>
              <Grid.Row style={{ paddingBottom: '0px', marginBottom: '0px' }}>
                <Grid.Column>
                  <Menu
                    inverted
                    pointing
                    secondary
                    style={{ padding: '0px', margin: '0px', border: '0px' }}
                  >
                    <Menu.Menu position="right">
                      <Menu.Item
                        name="auth"
                        active={activeItem === 'auth'}
                        style={{
                          maxWidth: '360px',
                          margin: '0px',
                          padding: '0px'
                        }}
                      >
                        <div style={{ display: 'block' }}>
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
                        </div>
                      </Menu.Item>
                    </Menu.Menu>
                  </Menu>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: '0px', marginTop: '0px' }}>
                <Grid.Column>
                  <Menu
                    inverted
                    pointing
                    secondary
                    style={{ padding: '0px', margin: '0px', border: '0px' }}
                  >
                    <Menu.Item
                      name="nav1"
                      active={activeItem === 'nav1'}
                      onClick={handleItemClick}
                      className="nav-item-sel"
                    >
                      <Header as="h3" color="grey">
                        Nav Item 1
                      </Header>
                    </Menu.Item>
                    <Menu.Item
                      name="nav2"
                      active={activeItem === 'nav2'}
                      onClick={handleItemClick}
                      className="nav-item-sel"
                    >
                      <Header as="h3" color="grey">
                        Nav Item 2
                      </Header>
                    </Menu.Item>
                    <Menu.Item
                      name="nav3"
                      active={activeItem === 'nav3'}
                      onClick={handleItemClick}
                      className="nav-item-sel"
                    >
                      <Header as="h3" color="grey">
                        Nav Item 3
                      </Header>
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
