import { merge } from "lodash";
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES
} from "./../actions/message_actions";

const initialState = {};

const messagesReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return merge({}, state, { [action.message.id]: action.message });
    case RECEIVE_MESSAGES:
      return merge({}, state, action.messages);
    default:
      return state;
  }
};

export default messagesReducer;
