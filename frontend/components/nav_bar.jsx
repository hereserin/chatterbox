import React from "react";
import { connect } from "react-redux";
import { logout } from "./../actions/session_actions";

const NavBar = props => {
  return (
    <nav>
      <div onClick={props.logout}>
        <i className="fas fa-bars" />
      </div>
      <div
        onClick={() => {
          props.history.push(`/chats`);
        }}
      >
        Chatterbox
      </div>
      <div>
        <i className="fas fa-search" />
      </div>
    </nav>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
