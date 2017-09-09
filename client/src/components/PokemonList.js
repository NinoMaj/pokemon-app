import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Card, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import PokemonItem from './PokemonItem';
import Button from './Button';
import { getPokemons } from '../actions/pokemonActions';
import { savePokemon, deletePokemon } from '../actions/userActions';
import InfoText from './InfoText';
// import { displayNotification } from '../actions/notificationActions'


const StyledContainer = styled(Container) `
  margin-top: 50px;
`;

const StyledCardGroup = styled(Card.Group) `
  justify-content: space-around;
  margin: 0 auto;

  &:after {
    display: block;
    clear: both;
  }
`;

class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.handleSavingPokemon = this.handleSavingPokemon.bind(this);
    this.handleDeletePokemon = this.handleDeletePokemon.bind(this);
    this.handleLoadMorePokemons = this.handleLoadMorePokemons.bind(this);
  }


  // shouldComponentUpdate(nextProps) {
  //   return this.props.pokemons.list.length !== nextProps.pokemons.list.length;
  // }

  handleSavingPokemon(pokemonId) {
    this.props.savePokemonAction(pokemonId);
    // this.props.displayNotificationAction(
    //   'success',
    //   'Pokemon saved!',
    //   'This pokemon is added to your pokemon list',
    // )
  }

  handleDeletePokemon(pokemonId) {
    this.props.deletePokemonAction(pokemonId);
    // this.props.displayNotificationAction(
    //   'info',
    //   'Pokemon deleted',
    //   'This pokemon has been successfully deleted from your pokemon list',
    // );
  }

  handleLoadMorePokemons() {
    console.log('tu');
    // this.props.getPokemonsAction(this.props.pokemons.offset);
  }

  infoText() {
    const { page } = this.props;
    if (page === '/my-pokemons') {
      const caughtPokemons = this.props.user.savedPokemons.length;

      const renderPlural = caughtPokemons > 1 ? 's' : '';

      const title = caughtPokemons === 0 ?
        'You haven`t caught any pokemons yet.'
        :
        `You have caught ${caughtPokemons} pokemon${renderPlural()} till now`;

      const text = caughtPokemons > 0 ?
        'If you want to release some of them into the wild, press on pokemon and then on open ball'
        :
        '';
      return (
        <InfoText
          title={title}
          text={text}
        />
      );
    } else if (page === '/') {
      return (
        <InfoText
          title="Pokemon app"
          text="Press on a pokemon and then on pokeball to catch him. To check his stats press on his name."
        />
      );
    }
    return null;
  }

  renderPokemonList() {
    const { pokemonsList } = this.props.pokemons;
    const { page, userPokemons } = this.props;
    let pokemons = [];
    if (pokemonsList.length > 0) {
      if (page === '/my-pokemons') {
        pokemons = pokemonsList.filter(item => userPokemons.includes(item.id)).map(pokemon => (
          <PokemonItem
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            description={pokemon.description}
            imgUrl={pokemon.imgUrl}
            largeImgUrl={pokemon.largeImgUrl}
            type={pokemon.type}
            page={page}
            deletePokemon={this.handleDeletePokemon}
          />
        ));
      } else if (page === '/') {
        pokemons = pokemonsList.map(pokemon => (
          <PokemonItem
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            description={pokemon.description}
            imgUrl={pokemon.imgUrl}
            largeImgUrl={pokemon.largeImgUrl}
            type={pokemon.type}
            page={page}
            savePokemon={this.handleSavingPokemon}
          />
        ));
      }
      return pokemons;
    }
    return null;
  }

  render() {
    const pokemonList = this.renderPokemonList();
    return (
      <div>
        <StyledContainer>
          {this.infoText()}
          <StyledCardGroup>
            {this.props.pokemons.loading ?
              <Loader size="large" active>Catching pokemons...</Loader>
              :
              pokemonList
            }
          </StyledCardGroup>
          {!this.props.pokemons.loading &&
            <Button
              color="red"
              size="big"
              text="Load more"
              onClick={this.handleLoadMorePokemons}
            />}
        </StyledContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemon,
  userPokemons: state.user.savedPokemons,
});

const mapDispatchToProps = dispatch => ({
  getPokemonsAction: offset => dispatch(getPokemons(offset)),
  savePokemonAction: id => dispatch(savePokemon(id)),
  deletePokemonAction: id => dispatch(deletePokemon(id)),
  // displayNotificationAction: (notifType, title, message) =>
  //   dispatch(displayNotification(notifType, title, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
