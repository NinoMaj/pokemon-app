import {
  USER_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SAVE_POKEMON,
  DELETE_POKEMON,
  USER_FAILURE,
} from '../actions/userActions';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  savedPokemons: [],
  error: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return Object.assign({}, state, { loading: true });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true, loading: false });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: false, loading: false });
    case SAVE_POKEMON:
      return Object.assign({}, state, { savedPokemons: [...state.savedPokemons, action.payload], loading: false });
    case DELETE_POKEMON:
      return Object.assign({}, state, { savedPokemons: state.savedPokemons.filter(savedPokemon => savedPokemon !== action.payload), loading: false });
    case USER_FAILURE:
      return Object.assign({}, state, { error: action.payload, loading: false });
    default:
      return state;
  }
}

export default userReducer;
