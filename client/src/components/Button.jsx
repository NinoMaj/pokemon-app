import React from 'react';
import styled from 'styled-components';
import { Button as Btn } from 'semantic-ui-react';

const ButtonBox = styled.div`
  width: 200px;
  margin: 30px auto;
`;

const Button = ({ color, size, text, loadMorePokemons }) => (
  <ButtonBox onClick={loadMorePokemons}>
    <Btn color={color} size={size}>{text}</Btn>
  </ButtonBox>
);

export default Button;
