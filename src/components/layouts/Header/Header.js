import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Style
import "./header_style.scss";

//Redux
import { logOut } from "../../../redux/actions/auth_action";
import { emptyImagesArray } from "../../../redux/actions/images_action";

class Header extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logOut();
    this.props.emptyImagesArray();
  };

  render() {
    const { uid } = this.props.auth;
    const { initials } = this.props.profile;
    return (
      <header className="main-header">
        <nav>
          <div className="nav-logo nav-item">
            <h2 className="nav-logo">
              {" "}
              {uid ? (
                <Link to="/">Imago </Link>
              ) : (
                <Link to="/login">Imago </Link>
              )}
            </h2>
          </div>
          <div className="navigation nav-item">
            <ul>
              {uid ? (
                <li className="nav-link">
                  <Link to="/">Gallery</Link>
                </li>
              ) : null}
              <li className="nav-link">
                <Link to="/about">About</Link>
              </li>
              {!uid ? (
                <li className="nav-link">
                  <Link to="/signup">Signup</Link>
                </li>
              ) : null}
              {!uid ? (
                <li className="nav-link">
                  <Link to="/login">Login</Link>
                </li>
              ) : null}
              {uid ? (
                <li className="nav-link" onClick={this.logout}>
                  <a href="!#">Logout</a>
                </li>
              ) : null}
              {uid ? (
                <Link to="/profile">
                  <li className="nav-link initials">{initials}</li>
                </Link>
              ) : null}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyImagesArray: () => {
      dispatch(emptyImagesArray());
    },
    logOut: () => {
      dispatch(logOut());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
