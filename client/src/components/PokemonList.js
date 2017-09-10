import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Card, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import PokemonItem from './PokemonItem';
import Button from './Button';
import { getPokemons } from '../actions/pokemonActions';
import { savePokemon, deletePokemon } from '../actions/userActions';
import InfoText from './InfoText';
import { displayNotification } from '../actions/notificationActions';


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

const LoaderText = styled.span`
  color: #3e3e3e;
  font-size: 1em;
  font-weight: bold;
`;

class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.handleSavingPokemon = this.handleSavingPokemon.bind(this);
    this.handleDeletePokemon = this.handleDeletePokemon.bind(this);
    this.handleLoadMorePokemons = this.handleLoadMorePokemons.bind(this);
  }

  handleSavingPokemon(pokemonId, event) {
    event.stopPropagation();
    this.props.savePokemonAction(pokemonId);
    this.props.displayNotificationAction(
      'success',
      'Pokemon caught!',
      'This pokemon is added to your pokemon list.',
      'checkmark',
    );
  }

  handleDeletePokemon(pokemonId, event) {
    event.stopPropagation();
    this.props.deletePokemonAction(pokemonId);
    this.props.displayNotificationAction(
      'warning',
      'Pokemon released!',
      'This pokemon has been successfully removed from your pokemon list.',
      'remove',
    );
  }

  handleLoadMorePokemons() {
    this.props.getPokemonsAction(this.props.pokemons.offset);
  }

  infoText() {
    const { page } = this.props;
    if (page === '/my-pokemons') {
      const caughtPokemons = this.props.userPokemons.length;

      const renderPlural = () => caughtPokemons > 1 ? 's' : '';

      const title = caughtPokemons === 0 ?
        'You haven`t caught any pokemons yet.'
        :
        `You have caught ${caughtPokemons} pokemon${renderPlural()} till now`;

      const text = caughtPokemons > 0 ?
        'If you want to release some of them into the wild, press on pokemon and then on pokeball.'
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
          text="If you are logged in you can press on a pokemon and then on pokeball to catch him. To check his stats press on his name."
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
            savedPokemons={this.props.userPokemons}
            isUserLoggedIn={this.props.isUserLoggedIn}
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
            {pokemonList}
          </StyledCardGroup>
          {this.props.pokemons.loading &&
            <div style={{ marginTop: 30, marginBottom: 50 }}>
            <Loader size="large" active inline="centered"><LoaderText>Catching pokemons...</LoaderText></Loader>
            </div>
          }
          {!this.props.pokemons.loading &&
            <Button
              color="red"
              size="huge"
              text="Load more"
              loadMorePokemons={this.handleLoadMorePokemons}
            />}
        </StyledContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemon,
  userPokemons: state.user.savedPokemons,
  isUserLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  getPokemonsAction: offset => dispatch(getPokemons(offset)),
  savePokemonAction: id => dispatch(savePokemon(id)),
  deletePokemonAction: id => dispatch(deletePokemon(id)),
  displayNotificationAction: (notificationType, title, message, icon) =>
    dispatch(displayNotification(notificationType, title, message, icon)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
