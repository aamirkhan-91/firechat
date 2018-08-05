import React from "react";

import "./Button.scss";

const button = props => {
  return (
    <button disabled={props.disabled} className="btn btn-primary">
      {props.text}
    </button>
  );
};

export default button;
