import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Card, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import PokemonItem from './PokemonItem';
import { getPokemons } from '../actions/pokemonActions';
// import { displayNotification } from '../actions/notificationActions'


const StyledContainer = styled(Container) `
  margin-top: 50px;
`;

const StyledCardGroup = styled(Card.Group)`
  justify-content: space-around;
  margin: 0 auto;

  &:after {
    display: block;
    clear: both;
  }
`;

class PokemonList extends Component {
  componentDidMount() {
    this.props.getPokemonsAction(this.props.pokemons.offset);
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.pokemons.list.length !== nextProps.pokemons.list.length;
  // }

  renderPokemonList() {
    const { pokemonsList } = this.props.pokemons;
    console.log(this.props);
    // if (!pokemons) {
    //   return (
    //     <Loader size="large" active>Loading</Loader>
    //   );
    // }
    // const { pokemons, user, page } = this.props
    // pokemonId, pokemonName, pokemonType
    const page = 'fsdf';
    let pokemons = [];
    if (pokemonsList.length > 0) {
      if (page === 'MY_POKEMON_ROUTE') {
      } else {
        pokemons = pokemonsList.map(pokemon => (
          <PokemonItem
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            description={pokemon.description}
            imgUrl={pokemon.imgUrl}
            largeImgUrl={pokemon.largeImgUrl}
            type={pokemon.type}
          />
        ));
      }
      return pokemons;
    }
  }

  // handleSavingPokemon(pokemonId) {
  //   this.props.pinProjectAction(projectId, this.props.userId)
  //   this.props.displayNotificationAction(
  //     'success',
  //     'Pokemon saved!',
  //     'This pokemon is added to your pokemon list',
  //   )
  // }

  // handleDeletingPokemon(pokemonId) {
  //   this.props.deleteProjectAction(projectId)
  //   this.props.displayNotificationAction(
  //     'info',
  //     'Pokemon deleted',
  //     'This pokemon has been successfully deleted from your pokemon list',
  //   )
  // }

  render() {
    const pokemonList = this.renderPokemonList();
    return (
      <div>
        <StyledContainer>
          <StyledCardGroup>
            {this.props.pokemons.loading ?
              <Loader size="large" active>Catching pokemons... :)</Loader>
              :
              pokemonList}
          </StyledCardGroup>
        </StyledContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemon,
});

const mapDispatchToProps = dispatch => ({

  getPokemonsAction: () => dispatch(getPokemons()),

  // deletePokemonAction: projectId => dispatch(deleteProject(projectId)),

  // pinProjectAction: (projectId, user) => dispatch(pinProject(projectId, user)),

  // displayNotificationAction: (notifType, title, message) =>
  //   dispatch(displayNotification(notifType, title, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
