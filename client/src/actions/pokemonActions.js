/* eslint-disable */
let Pokedex = require('pokedex-promise-v2');
var options = {
  protocol: 'https',
  hostName: 'https://pokemon48.herokuapp.com/',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
let P = new Pokedex(options);

// import { STATIC_PATH, WDS_PORT } from '../config'
// import { isProd } from '../util'

// import {
//   ADD_PROJECT_ROUTE,
//   GET_PROJECTS_ROUTE,
//   EDIT_PROJECT_ROUTE,
//   PIN_PROJECT_ROUTE,
//   DELETE_PROJECT_ROUTE,
// } from '../../shared/routes'

export const POKEMON_REQUEST = 'POKEMON_REQUEST';
// export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS'
export const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
// export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS'
// export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'
export const POKEMON_FAILURE = 'POKEMON_FAILURE';

export const pokemonRequest = () => ({ type: POKEMON_REQUEST });

// export const addProjectSuccess = (projectAdded: any) =>
//   ({ type: ADD_PROJECT_SUCCESS, payload: projectAdded })

export const getPokemonsSuccess = (pokemons) =>
  ({ type: GET_POKEMONS_SUCCESS, payload: pokemons });

// export const updateProjectSuccess = (project: any) =>
//   ({ type: UPDATE_PROJECT_SUCCESS, payload: project })

// export const deleteProjectSuccess = (projectId: number) =>
//   ({ type: DELETE_PROJECT_SUCCESS, payload: projectId })

export const pokemonFailure = (err) => ({ type: POKEMON_FAILURE, payload: err });



export const getPokemons = (offset) => (dispatch) => {
  dispatch(pokemonRequest());
  const interval = {
    limit: 11,
    offset,
  };
      function getPokemonDetail(name) {
        return P.getPokemonByName(name).then(function (val) {
          console.log('I got this pokemon', val)
          return val;
        });
      }

      function getPokemonsFromAPI() {
        return P.getPokemonsList(interval)
          .then((pokemonsResponse) => {
            let promises = [];
            for (let i = 0; i < pokemonsResponse.results.length; i++) {
              console.log(pokemonsResponse.results[i].name)
              promises.push(getPokemonDetail(pokemonsResponse.results[i].name));
            }
            Promise.all(promises)
              .then((pokemonsWithDetails) => {
                console.log('I am here')
                function pokemonIdWithZerosPadding(id) {
                  if (id < 10) {
                    return '00' + id;
                  } else if (id < 100) {
                    return '0' + id;
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
                })
                console.log('dataForState', dataForState, 'interval', interval.limit)
                dispatch(getPokemonsSuccess({ next: pokemonsResponse.next, offset: interval.limit, data: dataForState }));
              })
              .catch((err) => {
                dispatch(pokemonFailure(err));
              });
          });
      }

      getPokemonsFromAPI();
};
