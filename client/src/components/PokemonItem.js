import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Card, Image } from 'semantic-ui-react';

import pokeball from '../pokeball.png';

const ImgContainer = styled.div`
  cursor: pointer;
  background: 'grey';
`;

const Pokeball = styled.div`
  width: 96px;
  height: 96px;
  background-size: 96px 96px;
  background-repeat: no-repeat;
  display: none;
  position: absolute;
  right: 90px;
  top: 5%;
  ${ImgContainer}:hover & {
    display: block;
  }
`;

const PokemonItem = ({ name, id, description, imgUrl, largeImgUrl }) => {
  return (
    <Card>
      <Card.Content>
        <ImgContainer>
          <Image size="medium" src={`${largeImgUrl}`} />
          <Pokeball style={{ backgroundImage: `url(${pokeball})` }} />
        </ImgContainer>
        <Card.Header
          as={Link}
          to={`/pokemon/${id}`}
        >
          {name}
        </Card.Header>
        <Card.Meta>
          {`Pokemon: # ${id}`}
        </Card.Meta>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default PokemonItem;
