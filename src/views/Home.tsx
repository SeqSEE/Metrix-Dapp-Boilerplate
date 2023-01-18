import React from 'react';
import { Header } from 'semantic-ui-react';

export default function Home(): JSX.Element {
  return (
    <Header as="h1" style={{ color: 'whitesmoke' }}>
      <Header.Content>Hello Boilerplate</Header.Content>
      <Header.Subheader style={{ color: 'whitesmoke' }}>
        This is a subheader
      </Header.Subheader>
    </Header>
  );
}
