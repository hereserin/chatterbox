import { Link, withRouter } from "react-router-dom";
// import LogoutButton from "./logout_button.jsx";
import React from "react";
import { connect } from "react-redux";
import { logout } from "./../actions/session_actions";

const Greeting = props => {
  let greetingMessage;
  const logoutButton = (
    <div>
      <button onClick={props.logout} className="logout-button">
        Log Out
      </button>
    </div>
  );

  if (props.currentUser) {
    greetingMessage = (
      <div>
        <li>Hi, {props.currentUser.username}</li>
        {logoutButton}
      </div>
    );
  } else {
    greetingMessage = (
      <div className="greeting-login-signup">
        <Link to="/login">Login</Link>
        &nbsp;or&nbsp;
        <Link to="/signup">Sign up!</Link>
      </div>
    );
  }
  return greetingMessage;
};

// commented out stuff:
// <Link to='/signup' className="sign-up-nav-link">Sign Up</Link>
// <Link to='/login' className="login-nav-link">Sign In</Link>

const mapStateToProps = ({ session, entities }) => {
  return {
    currentUser: entities.users[session.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
