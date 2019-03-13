import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";

//style
import "./edit.scss";

//Componente
/* import UpdateImageForm from "../../forms/UpdateImageForm/UpdateImageForm"; */

//Redux
import { getImages, deleteImage } from "../../../redux/actions/images_action";

class Edit extends Component {
  state = {
    imageActive: false,
    imageIndex: ""
  };
  handleUpdate = index => {
    this.setState({
      imageActive: true,
      imageIndex: index
    });
  };
  handleDelete = (item, index) => {
    this.props.deleteImage(item, index);
  };

  hideForm = () => {
    this.setState({
      imageActive: false
    });
  };

  UNSAFE_componentWillMount = () => {
    const { uid } = this.props.auth;
    const { images } = this.props;
    if (uid && _.isEmpty(images)) {
      return this.props.getImages(uid);
    }
  };
  render() {
    const { images } = this.props;
    /* const { imageActive, imageIndex } = this.state; */
    return (
      <div className="edit-page">
        <table>
          <tbody>
            {!_.isEmpty(images)
              ? images.map((item, index) => (
                  <tr key={index}>
                    <td className="image">
                      <img src={item.imageUrl} alt="" />
                    </td>
                    <td className="options">
                      {/* <div
                        className="update"
                        title="Update"
                        onClick={this.handleUpdate.bind(this, index)}
                      >
                        <i className="fas fa-pen" />
                      </div> */}
                      <div
                        className="delete"
                        title="Delete"
                        onClick={this.handleDelete.bind(this, item, index)}
                      >
                        <i className="fas fa-times" />
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {/* <UpdateImageForm
          imageActive={imageActive}
          hideForm={this.hideForm}
          imageIndex={imageIndex}
        /> */}
      </div>
    );
  }
}
Edit.propTypes = {
  auth: PropTypes.object.isRequired,
  images: PropTypes.array,
  getImages: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    images: state.images.images
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteImage: (item, index) => {
      dispatch(deleteImage(item, index));
    },
    getImages: id => dispatch(getImages(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
