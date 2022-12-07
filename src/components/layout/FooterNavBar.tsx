import React from 'react';
import { Grid, Icon, List } from 'semantic-ui-react';

export default function Footer(): JSX.Element {
  const d = new Date();
  return (
    <Grid className="footer-bar" columns="equal">
      <Grid.Row className="footerNavBar">
        <Grid.Column>
          <span style={{ padding: '0px 4px' }}>
            <a href="/policy/terms">Terms & Conditions</a>
          </span>
          ❙
          <span style={{ padding: '0px 4px' }}>
            <a href="/policy/privacy">Privacy</a>
          </span>
          ❙
          <span style={{ padding: '0px 4px' }}>
            <a href="/policy/cookie">Cookies</a>
          </span>
        </Grid.Column>
        <Grid.Column>
          <List.Item as="a" href="https://metrixcoin.com" target="_blank">
            <Icon name="bolt" />
            Powered by MetrixCoin
          </List.Item>
        </Grid.Column>

        <Grid.Column style={{ padding: '0px 4px' }}>
          <a
            href={`${process.env.NEXT_PUBLIC_COPYRIGHT_LINK}`}
            target="_blank"
            rel="noreferrer"
          >
            ©{`${process.env.NEXT_PUBLIC_COPYRIGHT_YEAR}`}
            {d.getFullYear() !== Number(process.env.NEXT_PUBLIC_COPYRIGHT_YEAR)
              ? `-${d.getFullYear()} `
              : ' '}
            &nbsp;&nbsp;
            {`${process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER}`}
          </a>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
