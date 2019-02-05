import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChat } from "../actions/chat_actions";
import { clearSortOrderIds } from "../actions/order_actions";
import Loader from "./loading_symbol";
import MessageInChat from "./message_in_chat";
import MessageIndex from "./messages_index";
import NewMessageForm from "./new_message_form";
import { fetchMessages } from "../actions/message_actions";
import { ActionCableConsumer } from "react-actioncable-provider";
import Cable from "./cable";

class ChatShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
    this.state = {
      messages: [],
      activeChat: null
    };
  }

  componentDidMount() {
    this.props.clearSortOrderIds();
    this.props.fetchChat(this.props.chatId);
    this.props.fetchMessages(this.props.chatId);
  }

  handleReceivedChat(response) {
    debugger;
    const { chat } = response;
    console.log();
    this.setState({
      messages: [...this.state.messages, chat]
    });
  }

  handleReceivedMessage(response) {
    debugger;
    console.log("SUCCESS");
    console.log(response);
    // const { message } = response;
    // const chats = [...this.state.chats];
    // const chat = chats.find(chat => chat.id === message.chat_id);
    // chat.message = [...chat.messages, message];
    // this.setState({ chat });
  }

  handleRejectedMessage() {
    console.log("REJECTED");
  }

  handleConnectedMessage() {
    console.log("CONNECTED");
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    // <ActionCableConsumer
    //   channel={{ channel: "ChatsChannel" }}
    //   onReceived={this.handleReceivedChat}
    // />
    // {this.state.chats.length ? (
    //   <Cable
    //     chats={chats}
    //     handleReceivedMessage={this.handleReceivedMessage}
    //   />
    // ) : null}
    // <ActionCableConsumer
    //   channel={{ channel: "MessagesChannel", chat: this.props.chatId }}
    //   onReceived={this.handleReceivedMessage}
    // />

    return (
      <div>
        <p>actioncablehere:</p>
        <ActionCableConsumer
          channel={{ channel: "ChatsChannel", chat: this.props.chatId }}
          onReceived={this.handleReceivedMessage}
          onRejected={this.handleRejectedMessage}
          onConnected={this.handleConnectedMessage}
        />

        <h2>
          Chat no. {this.props.chatId}
          :
        </h2>
        <MessageIndex chatId={this.props.chatId} />
        <NewMessageForm />
      </div>
    );
  }
}

const mapStateToProps = ({ order, ui, entities }, ownProps) => {
  return {
    messageIds: order,
    loading: ui.loading.index,
    chatId: ownProps.match.params.chatId,
    chat: entities.chats[ownProps.match.params.chatId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChat: id => {
      return dispatch(fetchChat(id));
    },
    clearSortOrderIds: () => {
      return dispatch(clearSortOrderIds());
    },
    fetchMessages: chatId => {
      return dispatch(fetchMessages(chatId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatShow);
