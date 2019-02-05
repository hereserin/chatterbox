import { merge } from "lodash";
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from "./../actions/session_actions";
import { RECEIVE_CHATS, RECEIVE_CHAT } from "./../actions/chat_actions";
import { CLEAR_ORDER } from "./../actions/order_actions";
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES
} from "./../actions/message_actions";

const initialState = [];

const sortingOrderReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHATS:
      return action.order;
    case RECEIVE_CHAT:
      let newState = [action.order, ...state];
      return newState;
    case RECEIVE_MESSAGES:
      return action.order;
    case RECEIVE_MESSAGE:
      let newState2 = [...state, action.message.id];
      return newState2;
    case LOGOUT_CURRENT_USER:
    case CLEAR_ORDER:
      return initialState;
    default:
      return state;
  }
};

export default sortingOrderReducer;
