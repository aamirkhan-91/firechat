import React from 'react';

import { CSSTransition } from 'react-transition-group';

import './Loader.scss';

const Loader = (props) => {
  let component;
  const classes = ['loader'];

  if (props.overlay) {
    classes.push('overlay');
  }

  if (props.transition) {
    component = (
      <CSSTransition classNames="loader" unmountOnExit appear in={props.show} timeout={350}>
        <div className={classes.join(' ')}>
          <i className="fa fa-spinner fa-spin fa-3x" />
        </div>
      </CSSTransition>
    );
  } else {
    if (!props.show) {
      return null;
    }

    component = (
      <div className={classes.join(' ')}>
        <i className="fa fa-spinner fa-spin fa-3x" />
      </div>
    );
  }

  return component;
};

export default Loader;
