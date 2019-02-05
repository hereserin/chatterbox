import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const MessageInChat = props => {
  return (
    <div className="message-in-chat-item">
      <b> {props.message.user_id}: </b>
      {props.message.body}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.entities.messages[ownProps.messageId]
  };
};

export default connect(mapStateToProps)(MessageInChat);
