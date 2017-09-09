import React from 'react';
import styled from 'styled-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Message as SemanticMsg, Icon as SemanticIcon } from 'semantic-ui-react';

const Message = styled(SemanticMsg)`
  box-shadow: 0 0 15px rgba(0,0,0,0.35);
  display: inline-flex;
  padding-left: 10px;
  position: fixed!important;
  bottom: 12px;
  right: 12px;
  z-index: 5;
  opacity: 0.9s;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 15px 3px rgba(0,0,0,0.70);
  }
`;

const Icon = styled(SemanticIcon)`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const Div = styled.div`
  padding-left: 10px;
`;

const Notification = ({ notificationType, title, message, icon }) => (
  <ReactCSSTransitionGroup
    transitionName="animation"
    transitionEnterTimeout={750}
    transitionLeaveTimeout={450}
    transitionAppear
    transitionAppearTimeout={750}

  >
    <Message className={notificationType} >
      <div>
        <Icon name={icon} size="big" />
      </div>
      <Div>
        <h3>{title}</h3>
        <p>{message}</p>
      </Div>
    </Message>
  </ReactCSSTransitionGroup>
);

export default Notification;
