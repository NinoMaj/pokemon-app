import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Navigation from './components/Navigation/index.js';
import Home from './components/pages/Home';
import MyPokemons from './components/pages/MyPokemons';
import About from './components/pages/About';
import PokemonDetails from './components/pages/PokemonDetails';
import Footer from './components/Footer/index.js';
import './App.css';
import { getPokemons } from './actions/pokemonActions';


class App extends Component {
  componentDidMount() {
    this.props.getPokemons(this.props.offset);
  }
  render() {
    return (
      <div className="App">
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

export default withRouter(connect(mapStateToProps, { getPokemons })(App));
