import React from "react";

import "./Button.scss";

const button = props => {
  let classes = ['btn', 'primary'];

  if (props.accent) {
    classes.push('accent');
  }

  if (props.marginBottom) {
    classes.push('margin-bottom');
  }

  if (props.hasLabel) {
    classes.push('has-label');
  }

  if (props.block) {
    classes.push('block');
  }

  return (
    <button
      onClick={props.clicked}
      disabled={props.disabled}
      className={classes.join(" ")}
    >
      {props.text}
    </button>
  );
};

export default button;
