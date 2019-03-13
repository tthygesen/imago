import React, { Component } from "react";

//Style
import "./about.scss";
class About extends Component {
  render() {
    return (
      <div className="about-page">
        <h1>Imago</h1>
        <p>
          Imago is small private image gallery for learning CRUD functionalities
          with firebase storage. The application can almost CRUD but it can not
          update images since firebase has not made specific API for that.
        </p>
      </div>
    );
  }
}

export default About;
