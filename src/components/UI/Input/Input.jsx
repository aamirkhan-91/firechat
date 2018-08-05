import React, { Component } from 'react'

import { CSSTransition } from 'react-transition-group';

import './Input.scss';

class Input extends Component {
  state = {
    focussed: false,
    valid: false,
    touched: false,
    hasText: false
  };

  validation;
  validity = {};

  errorMessage;

  constructor(props) {
    super(props);

    this.validation = props.validation;
  }

  onInputFocussed = () => {
    this.setState({ focussed: true });
  };

  onInputBlurred = () => {
    this.setState({ focussed: false });
  };

  onInputChanged = (event) => {
    let hasText = this.state.hasText;

    if (event.target.value) {
      hasText = true;
    } else {
      hasText = false;
    }

    let isValid = this.checkValidity(event.target.value);

    this.setState({
      hasText: hasText,
      valid: isValid,
      touched: true
    });

    this.props.changed(this.props.name, isValid);
  };

  checkValidity = (value) => {
    let isValid = false;

    if (this.validation.required) {
      isValid = value !== '';

      this.validity.required = !isValid;
    }

    if (this.validation.pattern) {
      let regex = RegExp(this.validation.pattern);

      isValid = regex.test(value) && isValid;

      this.validity.pattern = !isValid;
    }

    if (this.validation.minLength) {
      isValid = value.length >= this.validation.minLength && isValid;

      this.validity.minLength = !isValid;
    }

    return isValid;
  };

  render() {
    let classes = [];

    if (this.state.focussed) {
      classes.push('focussed');
    }

    if (!this.state.valid && this.state.touched) {
      classes.push('has-error');
    }

    if (this.validity.required) {
      this.errorMessage = this.props.label + ' is required.';
    } else if (this.validity.pattern || this.validity.minLength) {
      this.errorMessage = 'Please enter a valid ' + this.props.label;
    }

    return (
      <div className={'form-input ' + classes.join(' ')}>
        <label
          className={
            'form-input__label' + (this.state.hasText ? ' has-text' : '')
          }
        >
          {this.props.label}
        </label>
        <input
          onChange={this.onInputChanged}
          onFocus={this.onInputFocussed}
          onBlur={this.onInputBlurred}
          type={this.props.type}
          required={this.props.validation.required}
          minLength={this.props.validation.minLength ? this.props.validation.minLength : 0}
          className='form-input__input'
        />
        <CSSTransition
          classNames='error'
          timeout={250}
          in={this.state.touched && !this.state.valid}
          mountOnEnter
          unmountOnExit>
            <p className='form-input__error-message'>{this.errorMessage}</p>
        </CSSTransition>
        <span className='form-input__status' />
      </div>
    );
  }
}

export default Input;