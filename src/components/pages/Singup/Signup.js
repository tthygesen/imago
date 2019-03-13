import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Redux
import { signUp } from "../../../redux/actions/auth_action";

//Style
import "./signup.scss";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = async e => {
    e.preventDefault();
    const user = this.state;
    this.props.signUp(user);
  };

  render() {
    const { errors } = this.props;
    return (
      <div>
        <form className="signup-form" onSubmit={this.submitForm}>
          <h2>Signup</h2>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          <div className="form-group">
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
            />
            {errors.firstname ? (
              <small className="error">{errors.firstname}</small>
            ) : null}
          </div>
          <div className="form-group">
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
            {errors.lastname ? (
              <small className="error">{errors.lastname}</small>
            ) : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.auth.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: user => {
      dispatch(signUp(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
