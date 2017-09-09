import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  flex-basis: 350px;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: space-around;
  margin-bottom: 40px;
`;

const DescriptionText = styled.div`
  font-size: 1em;
  margin-bottom: 20px;
  font-weight: bold;
`;

const DescriptionBox = styled.div`
  background-color: #30A7D7;
  border-radius: 5px;
  padding: 20px;
  font-weight: bold;
`;

const TextInBox = styled.p`
  color: #000;
  font-size: 1em;
`;

const WhiteColor = styled.span`
  color: #fff;
`;

const Description = ({ description, weight, height }) => (
  <Div>
    <DescriptionText>{description}</DescriptionText>
    <DescriptionBox>
      <TextInBox><WhiteColor>Weight:  </WhiteColor>{weight}</TextInBox>
      <TextInBox><WhiteColor>Height:  </WhiteColor>{height}</TextInBox>
    </DescriptionBox>
  </Div>
);

export default Description;
