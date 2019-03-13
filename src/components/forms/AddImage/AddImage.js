import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//style
import "./addimage.scss";

//Component
import Spinner from "../../layouts/Spinner/Spinner";

//Redux
import {
  uploadImage,
  successReset
} from "../../../redux/actions/images_action";
import { isLoading } from "../../../redux/actions/loading_action";

class AddImage extends Component {
  state = {
    image: null
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleFile = e => {
    const file = e.target.files[0];
    this.setState({
      image: file
    });
  };

  handleClick = () => {
    this.props.successReset();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { image } = this.state;
    const { uid } = this.props.auth;
    this.setState({
      isLoading: true
    });
    this.props.loading();
    this.props.uploadImage(uid, image);
  };

  render() {
    const { addImage, success, isLoading } = this.props;
    const { imageError } = this.state;
    const active = addImage ? "active" : "";
    return (
      <div className={`add-img-form ${active}`}>
        <form onSubmit={this.handleSubmit}>
          <div className="from-group">
            <label htmlFor="file">Image</label>
            <input
              type="file"
              onChange={this.handleFile}
              onClick={this.handleClick}
              accept="image/x-png, image/jpeg"
              required
            />
            {imageError ? (
              <small className="error">Please select an image</small>
            ) : null}
            {success ? <small className="success">Success</small> : null}
          </div>
          {isLoading ? <Spinner /> : <button type="submit">Add</button>}
        </form>
      </div>
    );
  }
}

AddImage.propTypes = {
  addImage: PropTypes.bool.isRequired,
  uploadImage: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (id, image) => dispatch(uploadImage(id, image)),
    successReset: () => {
      dispatch(successReset());
    },
    loading: () => dispatch(isLoading())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    success: state.images.success,
    isLoading: state.loading.isLoading
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddImage);
