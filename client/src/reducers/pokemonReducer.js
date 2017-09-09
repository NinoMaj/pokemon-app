import {
  POKEMON_REQUEST,
  GET_POKEMONS_SUCCESS,
  POKEMON_FAILURE,
} from '../actions/pokemonActions';

const initialState = {
  loading: false,
  pokemonsList: [],
  offset: 0,
  error: {},
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case POKEMON_REQUEST:
      return Object.assign({}, state, { loading: true });
    case GET_POKEMONS_SUCCESS:
      return Object.assign({}, state, { pokemonsList: [...state.pokemonsList, ...action.payload.data], offset: state.offset + action.payload.offset, loading: false });
    case POKEMON_FAILURE:
      return Object.assign({}, state, { error: action.payload, loading: false });
    default:
      return state;
  }
}

export default pokemonReducer;
