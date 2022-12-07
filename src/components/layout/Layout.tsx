import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Navigation from './Navigation';

export default function Layout(props: { children: JSX.Element }): JSX.Element {
  return (
    <Container fluid className="wrapper" id="space">
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <div className="stars"></div>
      <Navigation />
      <Container className="innerWrapper">
        <Grid>
          <Grid.Row style={{ maxHeight: '58em', minHeight: '58em' }}>
            <Grid.Column>{props.children}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  );
}
