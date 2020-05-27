import React, { Component } from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Toast from './Toast';

import './ToastContainer.scss';

class ToastContainer extends Component {
  state = {
    toasts: [],
    index: 0,
  }

  addErrorToast = (title, message) => {
    const { toasts, index } = this.state;
    let currentIndex = index;

    toasts.unshift({
      title, message, type: 'error', id: currentIndex,
    });
    currentIndex += 1;

    this.setState({
      toasts,
      index: currentIndex,
    });
  }

  dismissToast = (toastId) => {
    const { toasts } = this.state;

    for (let i = 0; i < toasts.length; i += 1) {
      if (toasts[i].id === toastId) {
        toasts.splice(i, 1);
      }
    }

    this.setState({
      toasts,
    });
  }

  render() {
    return (
      <div className="toast-container">
        <TransitionGroup>
          { this.state.toasts.map(toast => (
            <CSSTransition key={toast.id} timeout={500} classNames="toast">
              <Toast id={toast.id} dismiss={this.dismissToast} message={toast.message} type={toast.type} title={toast.title} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default ToastContainer;
