import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation/index.js';
import Home from './components/pages/Home';
import About from './components/pages/About';
import PokemonDetails from './components/pages/PokemonDetails';
import Footer from './components/Footer/index.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navigation />
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route path="/pokemon/:number" component={PokemonDetails} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
