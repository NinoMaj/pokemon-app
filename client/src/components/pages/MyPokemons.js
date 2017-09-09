import React from 'react';

import PokemonList from '../PokemonList';

const MyPokemons = () => {
  return (
    <div>
      <PokemonList page="/my-pokemons" />
    </div>
  );
}

export default MyPokemons;
