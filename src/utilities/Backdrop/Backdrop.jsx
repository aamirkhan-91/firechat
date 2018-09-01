import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Backdrop.scss";

const backdrop = props => {
  return (
    <CSSTransition appear in={props.show} mountOnEnter unmountOnExit timeout={350} classNames="backdrop">
      <div className="backdrop" />
    </CSSTransition>
  );
};

export default backdrop;
