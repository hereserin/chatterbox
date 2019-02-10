import React, { Component } from "react";
import Cable from "actioncable";
import { connect } from "react-redux";
import Loader from "./loading_symbol";
import { clearSortOrderIds } from "../actions/order_actions";
import { fetchMessages } from "../actions/message_actions";

class ChatroomArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: "",
      chatLogs: []
    };
  }

  componentWillMount() {
    this.createSocket();
  }

  componentDidMount() {
    this.props.clearSortOrderIds();
    this.props
      .fetchMessages(this.props.chatId)
      .then(() => this.setState({ chatLogs: this.mapMessagesToChatLog() }));
    // .then(() => this.setState({ chatLogs: this.props.messages }));
    // .then(chats => this.setState({ chats }));
  }

  mapMessagesToChatLog() {
    const mapped = this.props.messageIds.map(messageId => {
      return this.props.messages[messageId];
    });
    return mapped;
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create({
      chat_id: this.props.match.params.chatId,
      content: this.state.currentChatMessage,
      user_id: this.props.currentUser
    });
    this.setState({
      currentChatMessage: ""
    });
  }

  handleChatInputKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSendEvent(event);
    } //end if
  }

  createSocket() {
    let cable = Cable.createConsumer("ws://localhost:3000/cable");
    this.chats = cable.subscriptions.create(
      {
        channel: "ChatChannel"
      },
      {
        connected: () => {},
        received: data => {
          let chatLogs = this.state.chatLogs;
          chatLogs.push(data);
          this.setState({ chatLogs: chatLogs });
        },
        create: function(chatMessage) {
          this.perform("create", chatMessage);
        }
      }
    );
  }

  renderChatLog() {
    const chatLog = this.state.chatLogs ? (
      this.state.chatLogs.map(el => {
        return (
          <li key={`chat_${el.id}`}>
            <span className="chat-message">{el.content}</span>
            <span className="chat-created-at">{el.created_at}</span>
          </li>
        );
      })
    ) : (
      <li>no messages yet</li>
    );
    return chatLog;
  }

  render() {
    return (
      <div className="chatroom-area">
        <div className="stage">
          <h1>Chat</h1>
          <div className="chat-logs" />
          <ul className="chat-logs">{this.renderChatLog()}</ul>
          <input
            onKeyPress={e => this.handleChatInputKeyPress(e)}
            value={this.state.currentChatMessage}
            onChange={e => this.updateCurrentChatMessage(e)}
            type="text"
            placeholder="Enter your message..."
            className="chat-input"
          />
          <button onClick={e => this.handleSendEvent(e)} className="send">
            Send
          </button>{" "}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ order, ui, entities, session }, ownProps) => {
  return {
    messages: entities.messages,
    loading: ui.loading.index,
    chatId: ownProps.match.params.chatId,
    currentUser: session.id,
    messageIds: order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: chatId => {
      return dispatch(fetchMessages(chatId));
    },
    clearSortOrderIds: () => {
      return dispatch(clearSortOrderIds());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatroomArea);
