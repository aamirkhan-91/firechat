import React from 'react';

import { CSSTransition } from 'react-transition-group';

import Aux from '../Auxillary';
import Backdrop from '../Backdrop/Backdrop';

import Button from '../../components/UI/Button/Button';

import './Modal.scss';

const modal = ({
  show,
  title,
  children,
  showButtons,
  onAccept,
  onClose,
}) => (
  <Aux>
    <Backdrop show={show} />
    <CSSTransition in={show} appear mountOnEnter unmountOnExit timeout={350} classNames="modal">
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal__header">
            {title}
            <div onClick={onClose} className="modal__header__close-btn">
              <i className="fa fa-lg fa-times" />
            </div>
          </div>
          <div className="modal__content">
            {children}
          </div>
          {
              showButtons
                ? (
                  <div className="modal__buttons">
                    <Button text="Accept" clicked={onAccept} />
                  </div>
                ) : null
            }
        </div>
      </div>
    </CSSTransition>
  </Aux>
);

export default modal;
