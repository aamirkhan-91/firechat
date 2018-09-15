import React, { Component } from 'react'

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Toast from './Toast';

import './ToastContainer.scss';

class ToastContainer extends Component {
  state = {
    toasts: [],
    index: 0
  }

  addErrorToast = (title, message) => {
    let toasts = this.state.toasts;
    let currentIndex = this.state.index;

    toasts.unshift({ title: title, message: message, type: 'error', id: currentIndex});
    currentIndex++;

    this.setState({
      toasts: toasts,
      index: currentIndex
    });
  }

  dismissToast = toastId => {
    let toasts = this.state.toasts;

    for (let i = 0; i < toasts.length; i++) {
      if (toasts[i].id === toastId) {
        toasts.splice(i, 1);
      }
    }

    this.setState({
      toasts: toasts
    });
  }

  render() {
    return (
      <div className="toast-container">
        <TransitionGroup>
          { this.state.toasts.map(toast =>
            <CSSTransition key={toast.id} timeout={500} classNames="toast">
              <Toast id={toast.id} dismiss={this.dismissToast} message={toast.message} type={toast.type} title={toast.title} />
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default ToastContainer;