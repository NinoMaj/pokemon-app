import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex-basis: 350px;
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
`;


const ImageComponent = ({ largeImgUrl }) => {
  return (
    <Container>
      <Image src={largeImgUrl} alt="pokemon" />
    </Container>
    
  );
}

export default ImageComponent;
