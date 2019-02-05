import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import chatErrorsReducer from "./chat_errors_reducer";
import messageErrorsReducer from "./message_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  chat: chatErrorsReducer,
  message: messageErrorsReducer
});

export default errorsReducer;
