import React from "react";

import { CSSTransition } from "react-transition-group";

import Aux from "@/utilities/Auxillary";
import Backdrop from "@/components/UI/Backdrop/Backdrop";

import "./Modal.scss";

const modal = () => {
  return (
    <Aux>
      <Backdrop />
      <CSSTransition in={true} appear timeout={350} classNames="modal">
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal__close-btn">
              <i className="fa fa-times fa-lg" />
            </div>
          </div>
        </div>
      </CSSTransition>
    </Aux>
  );
};

export default modal;
