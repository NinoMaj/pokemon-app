import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  HamburgerIcon,
  HamburgerDashTop,
  HamburgerDashMiddle,
  HamburgerDashBottom,
} from './style';

import logo from '../../logo.svg';

export default class Navigation extends Component {
  state = {
    activeItem: 'home',
    hamburgerOpened: false,
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleHamburgerClick = () => this.setState({ hamburgerOpened: !this.state.hamburgerOpened });

  render() {
    const { activeItem } = this.state;

    return (
      <nav>

        <Menu stackable inverted>
          <HamburgerIcon className={this.state.hamburgerOpened ? 'open' : ''} onClick={this.handleHamburgerClick}>
            <HamburgerDashTop className={this.state.hamburgerOpened ? 'open' : ''} />
            <HamburgerDashMiddle className={this.state.hamburgerOpened ? 'open' : ''} />
            <HamburgerDashBottom className={this.state.hamburgerOpened ? 'open' : ''} />
          </HamburgerIcon>
          <Menu.Item>
            <img src={logo} style={{ height: 35 }} alt="logo" />
          </Menu.Item>
          <Menu.Item
            className={this.state.hamburgerOpened ? '' : 'dont-display'}
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>

          <Menu.Item
            className={this.state.hamburgerOpened ? '' : 'dont-display'}
            as={Link}
            to="/about-us"
            name="about"
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          >
            About
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}
