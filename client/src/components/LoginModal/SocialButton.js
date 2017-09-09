import React from 'react';
import styled from 'styled-components';

const color = {
  normal: {
    twitter: '#55acee',
    google: '#dd4b39',
    github: '#444',
  },
  dark: {
    twitter: '#2795e9',
    google: '#c23321',
    github: '#2b2b2b',
  },
};

const Button = styled.a`
  background-color: ${props => color.normal[props.service]};
  color: #fff;
  display: block;
  margin: 3px 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-shadow: 1px 0 1px rgba(0, 0, 0, .3);
  padding: 10px;
  border-radius: 3px;

  &:hover {
    background-color: ${props => color.dark[props.service]};
    color: #fff;
    cursor: pointer;
  }
`;

const SocialButton = ({ service, loginCallback }) => (
  <Button
    service={service}
    className="btn"
    // href={`/auth/${service}`}
    onClick={loginCallback}
  >
    {` Sign in with ${service[0].toUpperCase()}${service.slice(1)}`}
  </Button>
)

export default SocialButton;
