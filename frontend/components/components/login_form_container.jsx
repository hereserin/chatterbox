import { connect } from "react-redux";
import { login, loginDefault } from "./../actions/session_actions";
import SessionForm from "./session_form";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    errors: state.errors.session,
    currentUserId: state.session.id,
    formType: "login",
    formTitle: "Log in"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => {
      dispatch(login(user));
    },
    processDemo: user => {
      dispatch(loginDefault());
    },
    closeModal: modal => dispatch(closeModal()),
    openModal: type => dispatch(openModal(type))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SessionForm)
);
