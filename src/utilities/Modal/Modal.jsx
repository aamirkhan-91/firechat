import React from "react";

import { CSSTransition } from "react-transition-group";

import Aux from "@/utilities/Auxillary";
import Backdrop from "@/utilities/Backdrop/Backdrop";

import "./Modal.scss";

const modal = props => {
  return (
    <Aux>
      <Backdrop show={props.show} />
      <CSSTransition in={props.show} appear mountOnEnter unmountOnExit timeout={350} classNames="modal">
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal__header">
              {props.title}
              <div onClick={props.onClose} className="modal__header__close-btn">
                <i className="fa fa-lg fa-times" />
              </div>
            </div>
            <div className="modal__content">
              {props.children}
            </div>
          </div>
        </div>
      </CSSTransition>
    </Aux>
  );
};

export default modal;
