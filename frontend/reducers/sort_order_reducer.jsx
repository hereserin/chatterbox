import { merge } from "lodash";
// import { CLEAR_ORDER } from "./../actions/sort_order_actions";
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from "./../actions/session_actions";

const initialState = [];

const sortingOrderReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    // case RECEIVE_MESSAGES:
    //   return action.order;
    // case CLEAR_ORDER:
    case LOGOUT_CURRENT_USER:
      return initialState;
    default:
      return state;
  }
};

export default sortingOrderReducer;
