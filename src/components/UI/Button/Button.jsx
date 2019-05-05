import React from 'react';

import './Button.scss';

const button = ({
  accent,
  marginBottom,
  hasLabel,
  block,
  clicked,
  disabled,
  text,
}) => {
  const classes = ['btn', 'primary'];

  if (accent) {
    classes.push('accent');
  }

  if (marginBottom) {
    classes.push('margin-bottom');
  }

  if (hasLabel) {
    classes.push('has-label');
  }

  if (block) {
    classes.push('block');
  }

  return (
    <button
      onClick={clicked}
      disabled={disabled}
      className={classes.join(' ')}
    >
      {text}
    </button>
  );
};

export default button;
