import React from "react";
import { Provider } from "react-redux";
import Greeting from "./greeting";
import LoginFormContainer from "./login_form_container";
import SignUpFormContainer from "./signup_form_container";
import NewChatButton from "./new_chat_button";
import NewChatForm from "./new_chat_form";
import ChatIndex from "./chat_index";

import { AuthRoute, ProtectedRoute } from "./../util/route_util.jsx";
import { Route, Switch } from "react-router-dom";
import ChatroomArea from "./chatroom_area";
import NavBar from "./nav_bar";

// import Footer from "./footer/footer";

const App = () => (
  <div>
    <ProtectedRoute path="/chats" component={NavBar} />
    <div className="nav-space" />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/" component={SignUpFormContainer} />
    </Switch>
    <section>
      <ProtectedRoute exact path="/chats" component={NewChatButton} />
      <ProtectedRoute exact path="/chats" component={ChatIndex} />
      <Switch>
        <ProtectedRoute exact path="/chats/new" component={NewChatForm} />
        <ProtectedRoute path="/chats/:chatId" component={ChatroomArea} />
      </Switch>
    </section>
  </div>
);

export default App;
