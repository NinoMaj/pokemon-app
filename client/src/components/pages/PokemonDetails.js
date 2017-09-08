import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

import Image from '../Image';
import Description from '../Description';

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

//           <Stats />
//           <Type /> */}

class PokemonDetails extends Component {
  findPokemonById(id) {
    const pokemonArray = this.props.pokemonsList.filter(pokemon => pokemon.id === +id);
    const pokemonObject = pokemonArray[0];
    return pokemonObject;
  }
  render() {
    const pokemon = this.findPokemonById(this.props.match.params.number);
    const { id, name, description, largeImgUrl, height, weight } = pokemon;
    return (
      <Container text>
        <FlexBox>
          <Image largeImgUrl={largeImgUrl} />
          <Description description={description} height={height} weight={weight} />
        </FlexBox>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pokemonsList: state.pokemon.pokemonsList,
});


export default connect(mapStateToProps)(PokemonDetails);
