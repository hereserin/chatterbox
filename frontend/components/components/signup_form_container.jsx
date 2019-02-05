import { connect } from "react-redux";
import { signup, loginDefault } from "./../actions/session_actions";
import SessionForm from "./session_form";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    errors: state.errors.session,
    currentUserId: state.session.id,
    formType: "signup",
    formTitle: "Welcome to Chatterbox!"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => {
      dispatch(signup(user));
    },
    processDemo: user => {
      dispatch(loginDefault());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SessionForm)
);
