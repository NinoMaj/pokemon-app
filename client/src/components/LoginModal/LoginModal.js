import React, { Component } from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { login } from '../../actions/userActions';
import SocialButton from './SocialButton';

const ModalDescription = styled(Modal.Description)`
  margin: 5% auto;
`;


class LoginModal extends Component {
  state = { open: false };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  handleLogin = () => {
    this.props.login();
    this.close();
  }

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button inverted color="yellow" onClick={this.show('blurring')}>Login</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Login</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='https://assets.pokemon.com/assets/cms2/img/pokedex/full/100.png' />
            <ModalDescription>
              <Header>Choose</Header>
              <p>Want to save your pokemons?</p>
              <p>Just sign in with one of this!</p>
              <SocialButton service="twitter" loginCallback={this.handleLogin.bind(this)} />
              <SocialButton service="google" loginCallback={this.handleLogin.bind(this)} />
              <SocialButton service="github" loginCallback={this.handleLogin.bind(this)} />
            </ModalDescription>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.close}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default connect(null, {login})(LoginModal);
