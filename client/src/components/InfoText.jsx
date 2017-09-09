import React from 'react';
import styled from 'styled-components';

const TextBox = styled.div`
  width: 80%;
  margin: 0 auto 30px auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #1B82B1;
  font-size: 2em;
`;

const Text = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #3e3e3e;
  font-size: 1.1em;
  font-weight: bold;
`;

const InfoText = ({ title, text }) =>(
  <TextBox>
    <Title>{title}</Title>
    <Text>{text}</Text>
  </TextBox>
);

export default InfoText;
