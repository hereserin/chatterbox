import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { closeModal } from "../actions/modal_actions";
import { modalMaker } from "./modal";
import { submitChat } from "../actions/chat_actions";

class NewChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.handleSessionSubmissionResponse = this.handleSessionSubmissionResponse.bind(
      this
    );
    this.state = {
      newChatName: ""
    };
  }

  handleChange(e) {
    this.setState({ newChatName: e.target.value });
  }

  handleSubmit() {
    const newChat = {
      name: this.state.newChatName
    };
    this.props.submitChat(newChat);
    this.handleSessionSubmissionResponse();

    this.setState({ newChatName: "" });
  }

  handleSessionSubmissionResponse() {
    if (this.props.errors.length === 0) {
      if (this.props.currentUserId !== null) {
        this.props.closeModal();
      }
    }
  }

  showErrors() {
    if (this.props.errors) {
      const errorsList = this.props.errors.forEach(error => {
        return <li>error</li>;
      });
      return <ol>{errorsList}</ol>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="new-chat-form">
        Start a Chat
        {this.showErrors()}
        <span>
          <input
            type="text"
            placeholder="Name your Chat"
            value={this.state.newChatName}
            onChange={this.handleChange}
          />
          <Link to="/chats">
            <button onClick={this.handleSubmit}>Create Chat</button>
          </Link>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors.chat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitChat: chat => {
      dispatch(submitChat(chat));
    },
    closeModal: () => {
      dispatch(closeModal());
    }
  };
};

export default modalMaker(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewChatForm)
);
