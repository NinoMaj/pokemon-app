import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import MyPokemons from './components/pages/MyPokemons';
import About from './components/pages/About';
import PokemonDetails from './components/pages/PokemonDetails';
import Notifications from './components/Notifications';
import './App.css';
import { getPokemons } from './actions/pokemonActions';
import { getSavedPokemons } from './actions/userActions';

class App extends Component {
  componentDidMount() {
    this.props.getPokemons(this.props.offset);
    this.props.getSavedPokemons();
  }
  render() {
    return (
      <div className="App">
        <Notifications />
        <header>
          <Navigation isLoggedIn={this.props.isLoggedIn} />
        </header>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/my-pokemons"
              render={() => (
                this.props.isLoggedIn ? (
                  <MyPokemons />
                ) : (
                  <Redirect to="/" />
                )
              )}
            />
            <Route exact path="/about-us" component={About} />
            <Route path="/pokemon/:number" component={PokemonDetails} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  offset: state.pokemon.offset,
});

export default withRouter(connect(mapStateToProps, { getPokemons, getSavedPokemons })(App));
