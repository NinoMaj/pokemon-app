import React, { Component } from 'react';
import { Button, Header, Modal, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { login } from '../../actions/userActions';
import { displayNotification } from '../../actions/notificationActions';
import SocialButton from './SocialButton';
import loginImage from '../../login-image.png';

const ModalDescription = styled(Modal.Description)`
 
`;

class LoginModal extends Component {
  state = { open: false };

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  handleLogin = () => {
    this.props.loginAcion();
    this.props.displayNotificationAction(
      'info',
      'Login!',
      'You are logged in.',
      'add user',
    );
    this.close();
  }

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button inverted color="yellow" onClick={this.show('blurring')}>Login</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close} size="small">
          <Modal.Header>Login</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={loginImage} />
            <ModalDescription>
              <Header>Choose</Header>
              <p>Want to save your pokemons?</p>
              <p>Just sign in with one of this!</p>
              <SocialButton service="twitter" loginCallback={this.handleLogin} />
              <SocialButton service="google" loginCallback={this.handleLogin} />
              <SocialButton service="github" loginCallback={this.handleLogin} />
            </ModalDescription>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.close}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginAcion: () => dispatch(login()),
  displayNotificationAction: (notificationType, title, message, icon) =>
    dispatch(displayNotification(notificationType, title, message, icon)),
});

export default connect(null, mapDispatchToProps)(LoginModal);
