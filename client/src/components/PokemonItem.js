import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Card, Image } from 'semantic-ui-react';
import pokeball from '../pokeball.png';
import releasePokemon from '../release-pokemon.png';

const ImgContainer = styled.div`
  cursor: pointer;
  background: #F1F1F1;
  margin-bottom: 15px;
`;

const StyledCard = styled(Card) `
  box-shadow: 0 1px 2px 1px rgba(25,25,25,0.2)!important;
`;

const StyledImage = styled(Image) `
  border: 1px solid #F1F1F1;
  border-radius: 5px;
  position: relative;
`;

const Pokeball = styled.div`
  width: 96px;
  height: 96px;
  background-size: 96px 96px;
  background-repeat: no-repeat;
  position: absolute;
  left: 60%;
  top: 5%;
`;

const RealeasePokemon = styled.div`
  width: 96px;
  height: 96px;
  background-size: 96px 96px;
  background-repeat: no-repeat;
  position: absolute;
  left: 60%;
  top: 5%;
`;

class PokemonItem extends Component {
  state = { showIcon: false }

  handleSaveClick = e => this.props.savePokemon(this.props.id, e);
  handleDeleteClick = e => this.props.deletePokemon(this.props.id, e);
  showIcon = () => this.setState({ showIcon: !this.state.showIcon });
  render() {
    const { name, id, description, largeImgUrl, page, savedPokemons, isUserLoggedIn } = this.props;
    return (
      <StyledCard>
        <Card.Content>
          <ImgContainer>
            <StyledImage size="medium" src={`${largeImgUrl}`} onClick={this.showIcon} />
            {/* only render Pokeball if on homepage, user clicked on image of pokemon, not already saved and user is logged in */}
            {page === '/' && this.state.showIcon && !savedPokemons.includes(id) && isUserLoggedIn &&
              <ReactCSSTransitionGroup
                transitionName="animation"
                transitionEnterTimeout={750}
                transitionLeaveTimeout={450}
                transitionAppear
                transitionAppearTimeout={750}
              >
                <Pokeball style={{ backgroundImage: `url(${pokeball})` }} onClick={this.handleSaveClick} />
              </ReactCSSTransitionGroup>
            }
            {/* only render release pokeball if on my pokemons page and user clicked on image of pokemon */}
            {page === '/my-pokemons' && this.state.showIcon &&
              <ReactCSSTransitionGroup
                transitionName="animation"
                transitionEnterTimeout={750}
                transitionLeaveTimeout={450}
                transitionAppear
                transitionAppearTimeout={750}
              >
                <RealeasePokemon style={{ backgroundImage: `url(${releasePokemon})` }} onClick={this.handleDeleteClick} />
              </ReactCSSTransitionGroup>
            }
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
      </StyledCard>
    );
  }
}

export default PokemonItem;
