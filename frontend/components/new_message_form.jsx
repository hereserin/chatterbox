import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { submitMessage } from "../actions/message_actions";

class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showErrors = this.showErrors.bind(this);

    this.state = {
      newMessageBody: ""
    };
  }

  handleChange(e) {
    return this.setState({ newMessageBody: e.target.value });
  }

  handleSubmit() {
    const newMessage = {
      chat_id: this.props.match.params.chatId,
      content: this.state.newMessageBody,
      user_id: this.props.currentUser
    };

    this.setState({ newMessageBody: "" });
    this.props.submitMessage(newMessage);
  }

  showErrors() {
    console.log(this.props.errors);
    if (this.props.errors) {
      //   const errorsList = this.props.errors.map(error => {
      //     return <li>error</li>;
      // });
      //   return <ol>{errorsList}</ol>;
      return <p>{this.props.errors.statusText}</p>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="new-message-form">
        {this.showErrors()}
        <span>
          <input
            type="text"
            placeholder="Say something..."
            value={this.state.newMessageBody}
            onChange={this.handleChange}
          />

          <button onClick={this.handleSubmit}>Send</button>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors.message,
    currentUser: state.session.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitMessage: message => {
      dispatch(submitMessage(message));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewMessageForm)
);
