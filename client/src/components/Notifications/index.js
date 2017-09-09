import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notification from '../Notification';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notifType === nextProps.notifType &&
      this.props.title === nextProps.title &&
      this.props.message === nextProps.message &&
      this.props.id === nextProps.id) {
      return false;
    }
    this.setState({ show: true }); // Show notification
    setTimeout(() => { this.setState({ show: false }); }, 4000); // Hide notification after 4s
    return true;
  }

  render() {
    return (
      <div>
        {this.state.show &&
          <Notification
            id={this.props.id}
            notificationType={this.props.notificationType}
            title={this.props.title}
            message={this.props.message}
            icon={this.props.icon}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    id: state.notification.id,
    notificationType: state.notification.notificationType,
    title: state.notification.title,
    message: state.notification.message,
    icon: state.notification.icon,
  }
);

export default connect(mapStateToProps)(Notifications);
