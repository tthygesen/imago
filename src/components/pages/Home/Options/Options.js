import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./options.scss";

const Options = props => {
  const { addImageFunc, addImageBool } = props;
  const cancel = addImageBool ? "cancel" : "";
  return (
    <div className="options-wrapper">
      <button className="btn-edit-gallery" title="Edit gallery">
        <Link to="/edit">
          <i className="fas fa-wrench" />
        </Link>
      </button>
      <button
        className={`btn-add-image ${cancel}`}
        title="Add image"
        onClick={addImageFunc}
      >
        <i className="fas fa-plus" />
      </button>
    </div>
  );
};

Options.propTypes = {
  addImageFunc: PropTypes.func.isRequired,
  addImageBool: PropTypes.bool.isRequired
};

export default Options;
