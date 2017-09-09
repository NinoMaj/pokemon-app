import React from 'react';
import styled from 'styled-components';

const TextBox = styled.div`
  width: 80%;
  margin: 0 auto 30px auto;
`;

// color: #FFDD40 yellow, now blue
const Title = styled.h1`
  text-align: center;
  color: #1B82B1;
`;

const Text = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #4e4e4e;
  font-size: 1.1em;
`;

const InfoText = ({ title, text }) => {
  return (
    <TextBox>
      <Title>{title}</Title>
      <Text>{text}</Text>
    </TextBox>
  );
};

export default InfoText;
