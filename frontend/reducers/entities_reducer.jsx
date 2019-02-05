import { combineReducers } from "redux";
import usersReducer from "./user_reducer";
import chatsReducer from "./chat_reducer";
import messagesReducer from "./message_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  chats: chatsReducer,
  messages: messagesReducer
});

export default entitiesReducer;
