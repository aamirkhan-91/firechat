import React, { Component } from 'react';

import './Toast.scss';

class Toast extends Component {
  componentDidMount() {
    const { dismiss, props } = this.props;

    this.timeout = setTimeout(() => {
      dismiss(props.id);
    }, 5000);
  }

  dismissHandler = () => {
    const { dismiss, props } = this.props;

    clearTimeout(this.timeout);

    dismiss(props.id);
  }

  render() {
    const { title, message, type } = this.props;

    return (
      <div className={`toast ${type}`}>
        <span onClick={this.dismissHandler} className="toast__dismiss">
          <i className="fa fa-times" />
        </span>
        <p className="toast__title">{title}</p>
        <p className="toast__message">{message}</p>
      </div>
    );
  }
}

export default Toast;
