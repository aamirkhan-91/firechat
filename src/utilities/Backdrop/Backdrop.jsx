import React from "react";
import { CSSTransition } from "react-transition-group";

import "./Backdrop.scss";

const backdrop = () => {
  return (
    <CSSTransition appear in={true} timeout={350} classNames="backdrop">
      <div className="backdrop" />
    </CSSTransition>
  );
};

export default backdrop;
