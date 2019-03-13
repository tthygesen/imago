import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
/* import { firestoreConnect } from "react-redux-firebase"; */
import PropTypes from "prop-types";
import _ from "lodash";

//Style
import "./home.scss";

//Components
import AddImage from "../../forms/AddImage/AddImage";
import Options from "./Options/Options";

//Redux
import { getImages } from "../../../redux/actions/images_action";

class Home extends Component {
  state = {
    imageActive: false,
    sliderActive: false,
    addImage: false,
    currentImage: null,
    imageIndex: null
  };

  addImage = () => {
    this.setState({
      addImage: !this.state.addImage
    });
  };

  cancelAddImage = () => {
    this.setState({
      addImage: false
    });
  };

  sliderActive = (index, item) => {
    const { images } = this.props;
    const imageIndex = index + 1;
    images.forEach(element => {
      if (imageIndex === index + 1) {
        this.setState({
          sliderActive: true,
          currentImage: item.imageUrl,
          imageIndex: imageIndex
        });
      }
    });
  };

  closeSlider = () => {
    this.setState({
      sliderActive: false
    });
  };

  nextImage = () => {
    const { images } = this.props;
    const { imageIndex } = this.state;
    let next = imageIndex;
    next++;
    images.forEach(element => {
      if (next === images.length + 1) {
        let firstImage = images[0].imageUrl;
        this.setState({
          currentImage: firstImage,
          imageIndex: 1
        });
      } else if (imageIndex + 1 === next) {
        return this.setState({
          currentImage: images[imageIndex].imageUrl,
          imageIndex: next
        });
      }
    });
  };

  previousImage = () => {
    const { images } = this.props;
    const { imageIndex } = this.state;
    let previous = imageIndex;
    previous--;
    images.forEach(element => {
      if (previous === 0) {
        let lastImage = images[images.length - 1].imageUrl;
        let lastIndex = images.length;
        this.setState({
          currentImage: lastImage,
          imageIndex: lastIndex
        });
      } else if (imageIndex - 1 === previous) {
        return this.setState({
          currentImage: images[imageIndex - 2].imageUrl,
          imageIndex: previous
        });
      }
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
    const { addImage, sliderActive, currentImage, fileReset } = this.state;
    const active = sliderActive ? "active" : "";
    return (
      <div className="home-page">
        <div className="gallery">
          {!_.isEmpty(images)
            ? images.map((item, index) => {
                return (
                  <div key={index} className="picture">
                    <img
                      src={item.imageUrl}
                      alt=""
                      onClick={this.sliderActive.bind(this, index, item)}
                    />
                  </div>
                );
              })
            : null}
        </div>
        <div className={`slider ${active}`}>
          <div className="back" onClick={this.previousImage}>
            <i className="fas fa-chevron-left" />
          </div>
          <div className="the-image" onClick={this.closeSlider}>
            <img src={currentImage} alt="" />
          </div>
          <div className="forward" onClick={this.nextImage}>
            <i className="fas fa-chevron-right" />
          </div>
        </div>
        <AddImage addImage={addImage} fileReset={fileReset} />
        <Options addImageBool={addImage} addImageFunc={this.addImage} />
      </div>
    );
  }
}

Home.propType = {
  images: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    images: state.images.images
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getImages: id => dispatch(getImages(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
