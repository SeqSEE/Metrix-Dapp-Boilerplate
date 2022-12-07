import React from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import { fetchWrapper } from '../helpers/FetchWrapper';

export default function Home(): JSX.Element {
  // Use State Example
  const [foo, setFoo] = React.useState('...');

  // Use Effect Example
  React.useEffect(() => {
    const fetch = async () => {
      // Make call to API and await for response
      const data = await fetchWrapper.get('/api/hello');
      console.log(data);
      //setFoo(crow);
    };

    // Fetch data from API
    fetch();
  }, []);

  return (
    <Segment
      raised
      inverted
      basic
      style={{ background: 'rgba(27,28,29, 0.65)', borderRadius: '5px' }}
    >
      <Grid container className="grid-container" columns={14}>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          <Icon name="star outline" />
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          A
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          B
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          C
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          D
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          E
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          F
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          G
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          H
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          I
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          J
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          K
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          L
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '12px'
          }}
          textAlign="center"
        >
          <Icon name="star outline" />
        </Grid.Column>

        <Grid.Column className="grid-item" textAlign="center">
          VII
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" color="black" />
        </Grid.Column>
        <Grid.Column className="grid-item" textAlign="center">
          VII
        </Grid.Column>

        <Grid.Column className="grid-item" textAlign="center">
          VI
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="moon" color="black" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="grid-item" textAlign="center">
          VI
        </Grid.Column>

        <Grid.Column className="grid-item" textAlign="center">
          V
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="grid-item" textAlign="center">
          V
        </Grid.Column>

        <Grid.Column className="grid-item" textAlign="center">
          IV
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="grid-item" textAlign="center">
          IV
        </Grid.Column>

        <Grid.Column className="grid-item" textAlign="center">
          III
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="grid-item" textAlign="center">
          III
        </Grid.Column>

        <Grid.Column className="grid-item" textAlign="center">
          II
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="grid-item" textAlign="center">
          II
        </Grid.Column>

        <Grid.Column className="grid-item" textAlign="center">
          I
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="moon" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="game-tile" textAlign="center"></Grid.Column>
        <Grid.Column className="grid-item" textAlign="center">
          I
        </Grid.Column>

        <Grid.Column className="grid-item" textAlign="center">
          <i>null</i>
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="game-tile" textAlign="center">
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column className="grid-item" textAlign="center">
          <i>null</i>
        </Grid.Column>

        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          <Icon name="star" />
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          A
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          B
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          C
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          D
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          E
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          F
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          G
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          H
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          I
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          J
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          K
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          L
        </Grid.Column>
        <Grid.Column
          className="grid-item"
          style={{
            marginBottom: '7px',
            marginTop: '7px',
            textAlign: 'center'
          }}
        >
          <Icon name="star" />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
