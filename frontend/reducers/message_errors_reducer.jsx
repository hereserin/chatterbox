import {
  RECEIVE_MESSAGE_ERRORS,
  RECEIVE_MESSAGE
  // CLEAR_ERRORS
} from "./../actions/message_actions";

const initialState = [];

const messageErrorsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_MESSAGE_ERRORS:
      return action.errors;
    case RECEIVE_MESSAGE:
      return initialState;
    default:
      return state;
  }
};

export default messageErrorsReducer;
