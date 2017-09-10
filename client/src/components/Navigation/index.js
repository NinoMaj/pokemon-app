import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
  Menu,
  HamburgerIcon,
  HamburgerDashTop,
  HamburgerDashMiddle,
  HamburgerDashBottom,
} from './style';

import LoginModal from '../LoginModal/LoginModal';
import { logout } from '../../actions/userActions';
import { displayNotification } from '../../actions/notificationActions';
import logo from '../../pokeball.png';

class Navigation extends Component {
  state = {
    activeItem: 'home',
    hamburgerOpened: false,
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleHamburgerClick = () => this.setState({ hamburgerOpened: !this.state.hamburgerOpened });

  render() {
    const { activeItem } = this.state;

    return (
      <nav style={{ marginBottom: 20, marginTop: -4 }}>

        <Menu stackable inverted>
          <HamburgerIcon className={this.state.hamburgerOpened ? 'open' : ''} onClick={this.handleHamburgerClick}>
            <HamburgerDashTop className={this.state.hamburgerOpened ? 'open' : ''} />
            <HamburgerDashMiddle className={this.state.hamburgerOpened ? 'open' : ''} />
            <HamburgerDashBottom className={this.state.hamburgerOpened ? 'open' : ''} />
          </HamburgerIcon>
          <Menu.Item
            as={Link}
            to="/"
            name="Logo"
          >
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
          {this.props.isLoggedIn &&
            <Menu.Item
              className={this.state.hamburgerOpened ? '' : 'dont-display'}
              as={Link}
              to="/my-pokemons"
              name="my-pokemons"
              active={activeItem === 'my-pokemons'}
              onClick={this.handleItemClick}
            >
              Caught
            </Menu.Item>
          }

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
          {this.props.isLoggedIn ?
            <Menu.Menu position="right">
              <Menu.Item
                className={this.state.hamburgerOpened ? '' : 'dont-display'}
                name="logout"
              >
                <Button
                  inverted
                  color="yellow"
                  onClick={() => {
                    this.props.logoutAction();
                    this.props.displayNotificationAction(
                      'info',
                      'Logout!',
                      'You are logged out.',
                      'remove user',
                    );
                  }}
                >
                  Logout
                </Button>
              </Menu.Item>
            </Menu.Menu>
            :
            <Menu.Menu position="right">
              <Menu.Item
                className={this.state.hamburgerOpened ? '' : 'dont-display'}
                name="login"
              >
                <LoginModal />
              </Menu.Item>
            </Menu.Menu>
          }

        </Menu>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(logout()),
  displayNotificationAction: (notificationType, title, message, icon) =>
    dispatch(displayNotification(notificationType, title, message, icon)),
});

export default connect(null, mapDispatchToProps)(Navigation);
