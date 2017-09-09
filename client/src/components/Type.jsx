import React from 'react';
import styled from 'styled-components';
import { Button as TypeItem } from 'semantic-ui-react';

const TypeContainer = styled.div`
  flex-basis: 350px;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: space-around;
  border-radius: 5px;
  padding: 20px;
  color: #fff;
  border: 2px solid #F03E33;
  margin-bottom: 40px;
`;

const StatsTitle = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
  color: #000;
`;

const Type = ({ type }) => (
  <TypeContainer>
    <StatsTitle>Type:</StatsTitle>
    <div>
      {type.map((typeItem, i) => <TypeItem key={i} color="red" size="large" >{typeItem}</TypeItem>)}
    </div>
  </TypeContainer>
);

export default Type;
