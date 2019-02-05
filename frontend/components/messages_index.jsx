import React from "react";
import MessageInChat from "./message_in_chat";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMessages } from "../actions/message_actions";
import Loader from "./loading_symbol";

const MessageIndex = props => {
  const composeListItems = () => {
    if (props.messageIds[0] === undefined) {
      return "No messages yet...";
    }

    const messageFeed = props.messageIds.map(messageId => {
      return <MessageInChat messageId={messageId} key={messageId} />;
    });
    return messageFeed;
  };

  if (props.loading) {
    return <Loader />;
  }

  return <ul className="message-index">{composeListItems()}</ul>;
};

const mapStateToProps = ({ order, ui }) => {
  return {
    messageIds: order,
    loading: ui.loading.index
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: chatId => {
      return dispatch(fetchMessages(chatId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);
