import React from "react";
import { Link, withRouter } from "react-router-dom";
import { fetchChat } from "../actions/chat_actions";
import { clearSortOrderIds } from "../actions/order_actions";
import { connect } from "react-redux";

const ChatIndexItem = props => {
  return (
    <div
      className="chat-index-item"
      onClick={() => {
        props.clearSortOrderIds();
        props.handleClick(props.chatId);
        // props.fetchChat(props.chatId);
        props.history.push(`/chats/${props.chatId}`);
      }}
    >
      {props.chatname}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    chatname: state.entities.chats[ownProps.chatId].chatroom_name
  };
  // chatId: state.entities.chats[ownProps.chatId].id
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChat: id => {
      return dispatch(fetchChat(id));
    },
    clearSortOrderIds: () => {
      return dispatch(clearSortOrderIds());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatIndexItem)
);
