import * as ChatAPIUtil from "../util/chat_api_util";
export const RECEIVE_CHAT = "RECEIVE_CHAT";
export const RECEIVE_CHATS = "RECEIVE_CHATS";
export const RECEIVE_CHAT_ERRORS = "RECEIVE_CHAT_ERRORS";
export const START_LOADING_CHATS = "START_LOADING_CHATS";
export const START_LOADING_CHAT = "START_LOADING_CHAT";

export const submitChat = chat => dispatch =>
  ChatAPIUtil.makeChat(chat).then(
    chat => {
      return dispatch(receiveChat(chat));
    },
    errors => dispatch(receiveChatErrors(errors))
  );

// export const submitChat = chat => {
//   return dispatch => {
//     return ChatAPIUtil.makeChat(chat).then(
//       chat => {
//         return dispatch(receiveChat(chat));
//       },
//       errors => {
//         return dispatch(receiveChatErrors(errors));
//       }
//     );
//   };
// };

export const fetchChat = id => dispatch => {
  dispatch(startLoadingChat());
  return ChatAPIUtil.fetchChat(id).then(
    chat => dispatch(receiveChat(chat)),
    errors => dispatch(receiveChatErrors(errors))
  );
};

export const fetchChats = () => dispatch => {
  dispatch(startLoadingChats());
  return ChatAPIUtil.fetchChats().then(
    chats => dispatch(receiveChats(chats)),
    errors => dispatch(receiveChatErrors(errors))
  );
};

const receiveChat = ({ chat, order }) => {
  return {
    type: RECEIVE_CHAT,
    chat: chat
  };
};

const receiveChats = ({ chats, order }) => {
  return {
    type: RECEIVE_CHATS,
    chats: chats,
    order: order
  };
};

const receiveChatErrors = errors => {
  return {
    type: RECEIVE_CHAT_ERRORS,
    errors: errors
  };
};

export const startLoadingChats = () => ({
  type: START_LOADING_CHATS
});

export const startLoadingChat = () => ({
  type: START_LOADING_CHAT
});
