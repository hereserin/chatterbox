import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.notThisFormLink = this.notThisFormLink.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSessionSubmissionResponse = this.handleSessionSubmissionResponse.bind(
      this
    );

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange(type) {
    return e => {
      this.setState({ [type]: e.target.value });
    };
  }

  handleSubmit(inputType) {
    return e => {
      e.preventDefault();

      const user = Object.assign({}, this.state);

      if (inputType === "demo") {
        this.props.processDemo();
      } else {
        this.props.processForm(user);
      }
      this.setState({ password: "" });
    };
  }

  handleSessionSubmissionResponse() {
    if (this.props.errors.length === 0) {
      if (this.props.currentUserId !== null) {
        this.props.history.push(`/chats`);
      }
    }
  }

  componentDidMount() {
    this.handleSessionSubmissionResponse();
  }

  errorsList() {
    const currentErrors = this.props.errors.map((error, idx) => {
      return <li key={idx}>{error}</li>;
    });
    return <ul className="errors-list">{currentErrors}</ul>;
  }

  notThisFormLink() {
    if (this.props.formType === "login") {
      return (
        <p>
          Don't have an account yet? <Link to="/signup">Sign up</Link> today,
          and start chatting!
        </p>
      );
    }
    return (
      <p>
        Already have an account?&nbsp;<Link to="/login">Login here</Link>
      </p>
    );
  }

  render() {
    let inputClass = "session-form-modal-box-input";
    if (Object.keys(this.props.errors).length > 0) {
      inputClass = "session-form-modal-box-input-with-errors";
    }

    return (
      <div className="session-form">
        <span>
          <h2>{this.props.formTitle}</h2>
          <ul>{this.errorsList()}</ul>
          <form onSubmit={this.handleSubmit("user")}>
            <input
              type="text"
              placeholder="email"
              className={inputClass}
              value={this.state.username}
              onChange={this.handleChange("username")}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              className={inputClass}
              value={this.state.password}
              onChange={this.handleChange("password")}
            />
            <br />
            <button>{this.props.formType}</button>
          </form>
          <form onSubmit={this.handleSubmit("demo")}>
            <button>demo user</button>
          </form>
          {this.notThisFormLink()}
        </span>
      </div>
    );
  }
}

export default withRouter(SessionForm);
