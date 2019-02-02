import React, { Component } from "react";
import Cable from "actioncable";

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

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage);
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
        create: function(chatContent) {
          this.perform("create", {
            content: chatContent
          });
        }
      }
    );
  }

  renderChatLog() {
    return this.state.chatLogs.map(el => {
      return (
        <li key={`chat_${el.id}`}>
          <span className="chat-message">{el.content}</span>
          <span className="chat-created-at">{el.created_at}</span>
        </li>
      );
    });
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

export default ChatroomArea;
