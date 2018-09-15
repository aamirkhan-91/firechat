import React, { Component } from 'react'

import './Toast.scss';

class Toast extends Component {

  timeout;

  componentDidMount () {
    this.timeout = setTimeout(() => {
      this.props.dismiss(this.props.id);
    }, 5000);
  }

  dismissHandler = () => {
    clearTimeout(this.timeout);

    this.props.dismiss(this.props.id);
  }

  render() {
    return (
      <div className={"toast " + (this.props.type)}>
        <span onClick={this.dismissHandler} className="toast__dismiss">
          <i className="fa fa-times"></i>
        </span>
        <p className="toast__title">{this.props.title}</p>
        <p className="toast__message">{this.props.message}</p>
      </div>
    );
  }
}

export default Toast;
