import React from "react";
import { openModal } from "../actions/modal_actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const NewChatButton = props => {
  return (
    <div
      className="new-chat-button"
      onClick={() => {
        props.openModal();
        props.history.push(`/chats/new`);
      }}
    >
      <i className="fas fa-edit" />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => {
      dispatch(openModal());
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NewChatButton)
);
