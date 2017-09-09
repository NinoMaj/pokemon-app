import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Card, Image } from 'semantic-ui-react';
import pokeball from '../pokeball.png';
import releasePokemon from '../release-pokemon.png';

const ImgContainer = styled.div`
  cursor: pointer;
  background: #F1F1F1;
  margin-bottom: 15px;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 1px 2px 1px rgba(25,25,25,0.2)!important;
`;

const StyledImage = styled(Image)`
  border: 1px solid #F1F1F1;
  border-radius: 5px;
`;

const Pokeball = styled.div`
  width: 96px;
  height: 96px;
  background-size: 96px 96px;
  background-repeat: no-repeat;
  display: none;
  position: absolute;
  left: 60%;
  top: 5%;
  ${ImgContainer}:hover & {
    display: block;
  }
`;

const RealeasePokemon = styled.div`
  width: 96px;
  height: 96px;
  background-size: 96px 96px;
  background-repeat: no-repeat;
  display: none;
  position: absolute;
  left: 60%;
  top: 3%;
  ${ImgContainer}:hover & {
    display: block;
  }
`;

const PokemonItem = ({ name, id, description, largeImgUrl, page, savePokemon, deletePokemon }) => {
  const handleSaveClick = () => savePokemon(id);
  const handleDeleteClick = () => deletePokemon(id);
  return (
    <StyledCard>
      <Card.Content>
        <ImgContainer>
          <StyledImage size="medium" src={`${largeImgUrl}`} />
          {page === '/' &&
            <Pokeball style={{ backgroundImage: `url(${pokeball})` }} onClick={handleSaveClick} />
          }
          {page === '/my-pokemons' &&
            <RealeasePokemon style={{ backgroundImage: `url(${releasePokemon})` }} onClick={handleDeleteClick} />
          }
        </ImgContainer>
        <Card.Header
          // style={{ color: '#DF3D33' }} red color
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
    </StyledCard>
  );
}

export default PokemonItem;
