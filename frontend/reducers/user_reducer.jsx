import { merge } from "lodash";
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from "./../actions/session_actions";

const initialState = {};

const usersReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.user.id]: action.user });
    case LOGOUT_CURRENT_USER:
      return state;
    default:
      return state;
  }
};

export default usersReducer;
