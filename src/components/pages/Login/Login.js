import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Redux
import { logIn } from "../../../redux/actions/auth_action";

//Style
import "./login.scss";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const credentials = this.state;
    this.props.logIn(credentials);
  };

  render() {
    const { errors } = this.props;
    return (
      <div>
        <form className="login-form" onSubmit={this.submitForm}>
          <h2>Login</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            {errors.email ? (
              <small className="error">{errors.email}</small>
            ) : null}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            {errors.password ? (
              <small className="error">{errors.password}</small>
            ) : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    errors: state.auth.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: credentials => {
      dispatch(logIn(credentials));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
