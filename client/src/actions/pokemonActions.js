// let Pokedex = require('pokedex-promise-v2');
// var options = {
//   protocol: 'https',
//   hostName: 'pokemon48.herokuapp.com',
//   versionPath: '/api/v2/',
//   cacheLimit: 100 * 1000, // 100s
//   timeout: 5 * 1000 // 5s
// }
// let P = new Pokedex(options);

// import { STATIC_PATH, WDS_PORT } from '../config'
// import { isProd } from '../util'


export const POKEMON_REQUEST = 'POKEMON_REQUEST';
export const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
export const POKEMON_FAILURE = 'POKEMON_FAILURE';

export const pokemonRequest = () => ({ type: POKEMON_REQUEST });

export const getPokemonsSuccess = pokemons =>
  ({ type: GET_POKEMONS_SUCCESS, payload: pokemons });

export const pokemonFailure = err => ({ type: POKEMON_FAILURE, payload: err });

export const getPokemons = offset => (dispatch) => {
  const limit = 12;
  console.log('offset', offset);
  dispatch(pokemonRequest());
  // fetch('https://pokeapi.co/api/v2/pokemon/', {method: 'GET'})
  //   .then((resp) => resp.json()) // Transform the data into json
  //   .then(function (data) {
  //     // Create and append the li's to the 
  //     console.log('data', data);
  //   })
  //   .catch(function (error) {
  //     // If there is any error you will catch them here
  //     console.log(error)
  //   });

  function getPokemonDetail(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, { method: 'GET' })
      .then(resp => resp.json())
      .then(pokemonDetail => pokemonDetail);
  }

  function getPokemonsFromAPI() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`, { method: 'GET' })
      .then(resp => resp.json()).then((pokemonsResponse) => {
        console.log('pokemonsResponse', pokemonsResponse);
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
              return {
                id: pokemon.id,
                name: pokemon.name,
                description: `This is a dummy description for pokemon ${pokemon.name}`,
                imgUrl: pokemon.sprites.front_default,
                largeImgUrl: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonIdWithZerosPadding(pokemon.id)}.png`,
                height: pokemon.height,
                weight: pokemon.weight,
                type,
              };
            });
            dispatch(getPokemonsSuccess({ next: pokemonsResponse.next, offset: limit, data: dataForState }));
          })
          .catch((err) => {
            dispatch(pokemonFailure(err));
          });
      });
  }

  getPokemonsFromAPI();
};
