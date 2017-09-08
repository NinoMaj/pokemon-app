import React, { Component } from 'react';

import { Card } from 'semantic-ui-react'

class PokemonItem extends Component {
  state = {
    key: this.props.key || '',
    name: this.props.name || '',
    description: this.props.description || '',
    imgUrl: this.props.imgUrl || '',
    type: this.props.type || '',
  }
  render() {
    return (
      <Card>
        <Card.Content>
          {/* <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' /> */}
          <Card.Header>
            {this.state.name}
          </Card.Header>
          <Card.Meta>
            {this.state.key}
          </Card.Meta>
          <Card.Description>
            {this.props.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default PokemonItem;
