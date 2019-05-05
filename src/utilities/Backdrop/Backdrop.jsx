import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Backdrop.scss';

const backdrop = ({ show }) => (
  <CSSTransition appear in={show} mountOnEnter unmountOnExit timeout={350} classNames="backdrop">
    <div className="backdrop" />
  </CSSTransition>
);

export default backdrop;
