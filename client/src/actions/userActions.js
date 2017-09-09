export const USER_REQUEST = 'USER_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SAVE_POKEMON = 'SAVE_POKEMON';
export const GET_SAVED_POKEMONS = 'GET_SAVED_POKEMONS';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export const USER_FAILURE = 'USER_FAILURE';

export const userRequest = () => ({ type: USER_REQUEST });

export const userFailure = err => ({ type: USER_FAILURE, payload: err });

export const login = () => ({ type: LOGIN_SUCCESS });

export const savePokemon = (id) => {
  // add new pokemon to localStorage
  const newPokemonsToSaveInLocalStorage = localStorage.getItem('savedPokemons') ? `${localStorage.getItem('savedPokemons')},${id}` : id;
  localStorage.setItem('savedPokemons', newPokemonsToSaveInLocalStorage);

  return ({ type: SAVE_POKEMON, payload: id });
};

export const deletePokemon = (id) => {
  // get pokemons from localStorage, remove deleted one and save back to localStorage
  const savedInLocalStorage = localStorage.getItem('savedPokemons').split(',');
  const newPokemonsToSaveInLocalStorage = savedInLocalStorage.filter(item => item !== id);
  localStorage.setItem('savedPokemons', newPokemonsToSaveInLocalStorage.join(','));

  return ({ type: DELETE_POKEMON, payload: id });
};

export const getSavedPokemons = () => {
  const savedInLocalStorage = localStorage.getItem('savedPokemons') ?
    // if there are saved pokemons in localStorage get them, put them in a array and convert them to numbers, instead of string
    localStorage.getItem('savedPokemons').split(',').map(item => parseInt(item, 10))
    :
    [];
  return ({ type: GET_SAVED_POKEMONS, payload: savedInLocalStorage });
};

export const logout = () => ({ type: LOGOUT_SUCCESS });
