import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//style
import "./updateimage.scss";

//Redux
import { updateImage } from "../../../redux/actions/images_action";

class UpdateImageForm extends Component {
  state = {
    image: null
  };
  handleFile = e => {
    const file = e.target.files[0];
    this.setState({
      image: file
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { image } = this.state;
    const { imageIndex } = this.props;
    this.props.updateImage(image, imageIndex);
  };

  render() {
    const { imageActive, hideForm } = this.props;
    const active = imageActive ? "active" : "";
    return (
      <div className={`add-img-form ${active}`}>
        <form onSubmit={this.handleSubmit}>
          <div className="from-group">
            <label htmlFor="file">Image</label>
            <input type="file" onChange={this.handleFile} />
          </div>
          <button type="submit">Add</button>
          <button type="button" className="cancel" onClick={hideForm}>
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

UpdateImageForm.propTypes = {
  imageActive: PropTypes.bool.isRequired,
  hideForm: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    updateImage: (image, index) => dispatch(updateImage(image, index))
  };
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateImageForm);
