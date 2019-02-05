import {
  RECEIVE_CHAT_ERRORS,
  RECEIVE_CHAT,
  RECEIVE_CHATS
  // CLEAR_ERRORS
} from "./../actions/chat_actions";

const initialState = [];

const chatErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHAT_ERRORS:
      return action.errors;
    case RECEIVE_CHAT:
    case RECEIVE_CHATS:
      return initialState;
    default:
      return state;
  }
};

export default chatErrorsReducer;
