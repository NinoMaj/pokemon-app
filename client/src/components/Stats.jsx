import React from 'react';
import styled from 'styled-components';
import { Rating } from 'semantic-ui-react';

const StatsContainer = styled.div`
  flex-basis: 350px;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: space-around;
  background-color: #A4A4A4;
  border-radius: 5px;
  padding: 20px;
  color: #fff;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 25%, 75% 0);
  margin-bottom: 40px;
`;

const StatsTitle = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: bold;
`;

const StatText = styled.span`
  font-weight: bold;
  font-size: 0.9em;
`;


const Stats = ({ stats }) => (
  <StatsContainer>
    <StatsTitle>Stats:</StatsTitle>
    <div>
      {stats.map(stat => <div key={stat.id}><StatText>{`${stat.name}: `}</StatText><Rating rating={Math.round(stat.value / 10)} icon="star" maxRating={10} /></div>)}
    </div>
  </StatsContainer>
);

export default Stats;
