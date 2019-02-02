import React from "react";
import { Provider } from "react-redux";
import Greeting from "./greeting";
import LoginFormContainer from "./login_form_container";
import SignUpFormContainer from "./signup_form_container";
import { AuthRoute, ProtectedRoute } from "./../util/route_util.jsx";
import { Route, Switch } from "react-router-dom";
import ChatroomArea from "./chatroom_area";
import NavBar from "./nav_bar";

// import Footer from "./footer/footer";

const App = () => (
  <div>
    <Greeting />
    <ProtectedRoute path="/chats" component={NavBar} />
    <div className="nav-space" />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <AuthRoute exact path="/" component={SignUpFormContainer} />
    </Switch>
    <ChatroomArea />
  </div>
);

export default App;
