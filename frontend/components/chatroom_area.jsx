import React, { Component } from "react";
import Cable from "actioncable";
import { connect } from "react-redux";
import Loader from "./loading_symbol";
import { clearSortOrderIds } from "../actions/order_actions";
import { fetchMessages } from "../actions/message_actions";
import { fetchChat } from "../actions/chat_actions";

class ChatroomArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: "",
      chatLogs: [],
      chatroomName: "* room name *"
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

    this.props.fetchChat(this.props.chatId).then(() =>
      this.setState({
        chatroomName: this.props.chats[this.props.chatId].chatroom_name
      })
    );
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
            <div className="message">
              <div className="message-info">
                <span className="message-user">{el.user_id}</span>
                <span className="message-created-at">
                  {el.formatted_time}
                </span>{" "}
              </div>
              <span className="chat-message-container">
                <div className="chat-message">{el.content}</div>
              </span>
            </div>
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
          <h1 className="chat-show-title">{this.state.chatroomName}</h1>
          <div className="chat-logs" />
          <ul className="chat-logs">{this.renderChatLog()}</ul>
          <div className="chat-input-area">
            <input
              onKeyPress={e => this.handleChatInputKeyPress(e)}
              value={this.state.currentChatMessage}
              onChange={e => this.updateCurrentChatMessage(e)}
              type="text"
              placeholder="Send message..."
              className="chat-input"
            />
            <button onClick={e => this.handleSendEvent(e)} className="send">
              Send
            </button>{" "}
          </div>
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
    messageIds: order,
    chats: entities.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChat: chatId => {
      return dispatch(fetchChat(chatId));
    },
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
