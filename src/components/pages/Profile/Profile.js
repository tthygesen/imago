import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

//Style
import "./profile.scss";

//Redux
import {
  deleteAccount,
  resetError
} from "../../../redux/actions/profile_action";

export class Profile extends Component {
  state = {
    password: "",
    showDeleteForm: false
  };
  handleClick = e => {
    e.preventDefault();
    this.setState({
      showDeleteForm: true
    });
  };
  cancelDelete = () => {
    this.setState({
      showDeleteForm: false
    });
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.resetError();
  };
  handleSubmit = e => {
    e.preventDefault();
    const { password } = this.state;
    this.props.deleteAccount(password);
  };

  render() {
    const { showDeleteForm } = this.state;
    const { profile, errors } = this.props;
    const active = showDeleteForm ? `active` : "";
    return (
      <div className="profile-page">
        {profile.name ? (
          <div>
            <h1>{`${profile.name} ${profile.lastname} `}</h1>
            <button type="submit" className="delete" onClick={this.handleClick}>
              Delete account
            </button>
            <div className={`form-wrapper ${active}`}>
              <form onSubmit={this.handleSubmit}>
                <h2>Type password for deleting account</h2>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                  {!_.isEmpty(errors) ? (
                    <small className="error">{errors}</small>
                  ) : null}
                </div>
                <button type="submit">Delete</button>
                <button
                  type="button"
                  className="delete"
                  onClick={this.cancelDelete}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    errors: state.profile.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteAccount: password => {
      dispatch(deleteAccount(password));
    },
    resetError: () => {
      dispatch(resetError());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
