export const POKEMON_REQUEST = 'POKEMON_REQUEST';
export const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
export const POKEMON_FAILURE = 'POKEMON_FAILURE';

export const pokemonRequest = () => ({ type: POKEMON_REQUEST });

export const getPokemonsSuccess = pokemons =>
  ({ type: GET_POKEMONS_SUCCESS, payload: pokemons });

export const pokemonFailure = err => ({ type: POKEMON_FAILURE, payload: err });

export const getPokemons = offset => (dispatch) => {
  const pokemonsLoadedPerRequest = 12;
  dispatch(pokemonRequest());

  function getPokemonDetail(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, { method: 'GET' })
      .then(resp => resp.json())
      .then(pokemonDetail => pokemonDetail);
  }

  function getPokemonsFromAPI() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${pokemonsLoadedPerRequest}&offset=${offset}`, { method: 'GET' })
      .then(resp => resp.json()).then((pokemonsResponse) => {
        const promises = [];
        for (let i = 0; i < pokemonsResponse.results.length; i += 1) {
          promises.push(getPokemonDetail(pokemonsResponse.results[i].name));
        }
        Promise.all(promises)
          .then((pokemonsWithDetails) => {
            function pokemonIdWithZerosPadding(id) {
              if (id < 10) {
                return `00${id}`;
              } else if (id < 100) {
                return `0${id}`;
              }
              return id;
            }

            const dataForState = pokemonsWithDetails.map((pokemon) => {
              const type = pokemon.types.map(item => item.type.name);
              const stats = pokemon.stats.map((item, i) => ({
                id: i,
                name: item.stat.name,
                value: item.base_stat,
              }));
              return {
                id: pokemon.id,
                name: pokemon.name,
                description: `This is a dummy description for pokemon ${pokemon.name}`,
                imgUrl: pokemon.sprites.front_default,
                largeImgUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonIdWithZerosPadding(pokemon.id)}.png`,
                height: pokemon.height,
                weight: pokemon.weight,
                type,
                stats,
              };
            });
            dispatch(getPokemonsSuccess({ next: pokemonsResponse.next, offset: pokemonsLoadedPerRequest, data: dataForState }));
          })
          .catch((err) => {
            dispatch(pokemonFailure(err));
          });
      });
  }

  getPokemonsFromAPI();
};
