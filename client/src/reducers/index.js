import { combineReducers } from 'redux';

import pokemonReducer from './pokemonReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  pokemon: pokemonReducer,
  user: userReducer,
  notification: notificationReducer,
});
