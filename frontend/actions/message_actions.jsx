import * as MessageAPIUtil from "../util/message_api_util";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";
export const START_LOADING_MESSAGES = "START_LOADING_MESSAGES";
export const START_LOADING_MESSAGE = "START_LOADING_MESSAGE";

export const submitMessage = message => dispatch =>
  MessageAPIUtil.makeMessage(message).then(
    message => {
      return dispatch(receiveMessage(message));
    },
    errors => dispatch(receiveMessageErrors(errors))
  );

export const fetchMessage = id => dispatch => {
  MessageAPIUtil.fetchMessage(id).then(
    message => dispatch(receiveMessage(message)),
    errors => dispatch(receiveMessageErrors(errors))
  );
};

export const fetchMessages = chatId => dispatch => {
  dispatch(startLoadingMessages());
  return MessageAPIUtil.fetchMessages(chatId).then(
    messages => dispatch(receiveMessages(messages)),
    errors => dispatch(receiveMessageErrors(errors))
  );
};

const receiveMessage = ({ message, order, user }) => {
  return {
    type: RECEIVE_MESSAGE,
    message: message,
    user: user
  };
};

const receiveMessages = ({ messages, order, users }) => {
  return {
    type: RECEIVE_MESSAGES,
    messages: messages,
    users: users,
    order: order
  };
};

const receiveMessageErrors = errors => {
  return {
    type: RECEIVE_MESSAGE_ERRORS,
    errors: errors
  };
};

export const startLoadingMessages = () => ({
  type: START_LOADING_MESSAGES
});

export const startLoadingMessage = () => ({
  type: START_LOADING_MESSAGE
});
