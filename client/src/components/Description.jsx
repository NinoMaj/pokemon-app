import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  flex-basis: 300px;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: space-around;
`;

const DescriptionText = styled.div`
  font-size: 1em;
  margin-bottom: 20px;
`;

const DescriptionBox = styled.div`
  background-color: #30A7D7;
  border-radius: 5px;
  padding: 20px;
`;

const TextInBox = styled.p`
  color: #fff;
  font-size: 1em;
`;


const ImageComponent = ({ description, weight, height }) => {
  return (
    <Div>
      <DescriptionText>{description}</DescriptionText>
      <DescriptionBox>
        <TextInBox>{`Weight: ${weight}`}</TextInBox>
        <TextInBox>{`Height: ${height}`}</TextInBox>
      </DescriptionBox>
    </Div>
  );
}

export default ImageComponent;
