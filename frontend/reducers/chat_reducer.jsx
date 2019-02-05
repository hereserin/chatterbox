import { merge } from "lodash";
import { RECEIVE_CHAT, RECEIVE_CHATS } from "./../actions/chat_actions";

const initialState = {};

const chatsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CHAT:
      return merge({}, state, { [action.chat.id]: action.chat });
    case RECEIVE_CHATS:
      return merge({}, state, action.chats);
    default:
      return state;
  }
};

export default chatsReducer;
