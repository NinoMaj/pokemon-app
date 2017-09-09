import { DISPLAY_NOTIFICATION } from '../actions/notificationActions';

const initialState = {
  id: '',
  notificationType: '',
  title: '',
  message: '',
  icon: '',
};

const notificationReducer = (state = initialState, action) => {
  const { id, notificationType, title, message, icon } = action;

  switch (action.type) {
    case DISPLAY_NOTIFICATION:
      return Object.assign({}, state, { id, notificationType, title, message, icon });
    default:
      return state;
  }
};

export default notificationReducer;
