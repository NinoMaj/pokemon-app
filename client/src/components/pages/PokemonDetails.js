import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Container, Loader } from 'semantic-ui-react';

import Image from '../Image';
import Description from '../Description';
import Stats from '../Stats';
import Type from '../Type';

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Title = styled.h1`
  text-align: center;
  color: #111;
  font-size: 2em;
`;


class PokemonDetails extends Component {
  findPokemonById(id) {
    const pokemonArray = this.props.pokemonsList.filter(pokemon => pokemon.id === +id);
    const pokemonObject = pokemonArray[0];
    return pokemonObject;
  }
  render() {
    if (this.props.isLoading || this.props.pokemonsList.length === 0) {
      return <Loader size="large" active>Catching pokemon...</Loader>;
    }

    const pokemon = this.findPokemonById(this.props.match.params.number);
    const { id, name, description, largeImgUrl, height, weight, stats, type } = pokemon;
    return (
      <Container>
        <Title>{`${name} #${id}`}</Title>
        <FlexBox>
          <Image largeImgUrl={largeImgUrl} />
          <Description description={description} height={height} weight={weight} />
        </FlexBox>
        <FlexBox>
          <Stats stats={stats} />
          <Type type={type} />
        </FlexBox>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pokemonsList: state.pokemon.pokemonsList,
  isLoading: state.pokemon.loading,
});


export default connect(mapStateToProps)(PokemonDetails);
