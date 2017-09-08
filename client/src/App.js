import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navigation from './components/Navigation/index.js';
import Home from './components/pages/Home';
import About from './components/pages/About';
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
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
