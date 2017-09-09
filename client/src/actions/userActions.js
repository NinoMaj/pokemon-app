export const USER_REQUEST = 'USER_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SAVE_POKEMON = 'SAVE_POKEMON';
export const DELETE_POKEMON = 'DELETE_POKEMON';
export const USER_FAILURE = 'USER_FAILURE';

export const userRequest = () => ({ type: USER_REQUEST });

export const userFailure = err => ({ type: USER_FAILURE, payload: err });

export const login = () => ({ type: LOGIN_SUCCESS });

export const savePokemon = id => ({ type: SAVE_POKEMON, payload: id });

export const deletePokemon = id => ({ type: DELETE_POKEMON, payload: id });

export const logout = () => ({ type: LOGOUT_SUCCESS });
