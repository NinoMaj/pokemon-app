import React, { Component } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import SocialButton from './SocialButton';

class LoginModal extends Component {
  state = { open: false };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button inverted color="yellow" onClick={this.show('blurring')}>Login</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Login</Modal.Header>
          <Modal.Content image>
            {/* <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' /> */}
            <Modal.Description>
              <Header>Choose</Header>
              <p>Want to save your pokemons?</p>
              <p>Just sign in with one of this!</p>
              <SocialButton service="twitter" />
              <SocialButton service="google" />
              <SocialButton service="github" />
            </Modal.Description>
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

export default LoginModal;
