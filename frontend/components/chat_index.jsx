import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChats } from "../actions/chat_actions";
import Loader from "./loading_symbol";
import ChatIndexItem from "./chat_index_item";
import { clearSortOrderIds } from "../actions/order_actions";

class ChatIndex extends React.Component {
  constructor(props) {
    super(props);
    this.composeListItems = this.composeListItems.bind(this);
    this.findActiveChat = this.findActiveChat.bind(this);
    this.state = {
      chats: [],
      activeChat: null
    };
  }

  componentDidMount() {
    this.props.clearSortOrderIds();
    this.props
      .fetchChats()
      .then(() => this.setState({ chats: this.props.chats }));
    // .then(chats => this.setState({ chats }));
  }

  handleClick(id) {
    this.setState({ activeConversation: id });
  }

  handleReceivedChat(response) {
    console.log("RECEIVED CHAT");
    const { chat } = response;
    this.setState({
      chats: [...this.state.chats, chat]
    });
  }

  handleReceivedMessage(response) {
    //   const { message } = response;
    //   const chats = [...this.state.chats];
    //   const chat = chats.find(chat => chat.id === message.chat_id);
    //   chat.messages = [...chat.messages, message];
    //   this.setState({ chats });
  }

  composeListItems() {
    const chatListItems = this.props.chatIds.map(chatId => {
      return (
        <ChatIndexItem
          handleClick={this.handleClick.bind(this)}
          chatId={chatId}
          key={chatId}
        />
      );
    });
    return chatListItems;
  }

  findActiveChat(chats, activeChat) {
    return chats.find(chat => chat.id === activeChat);
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    return (
      <div>
        <ul className="chat-index">{this.composeListItems()}</ul>
      </div>
    );
  }
}

const mapStateToProps = ({ order, ui, entities }) => {
  return {
    chatIds: order,
    chats: entities.chats,
    loading: ui.loading.index
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChats: () => {
      return dispatch(fetchChats());
    },
    clearSortOrderIds: () => {
      return dispatch(clearSortOrderIds());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatIndex);
