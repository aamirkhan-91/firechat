import React, { Component } from 'react';

import { CSSTransition } from 'react-transition-group';

import './Input.scss';

class Input extends Component {
  state = {
    focussed: false,
    valid: false,
    touched: false,
    hasText: false,
  };

  validity = {};

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
    let { hasText } = this.state;
    const { changed, name } = this.props;

    if (event.target.value) {
      hasText = true;
    } else {
      hasText = false;
    }

    const isValid = this.checkValidity(event.target.value);

    this.setState({
      hasText,
      valid: isValid,
      touched: true,
    });

    changed(name, isValid, event.target.value);
  };

  checkValidity = (value) => {
    let isValid = false;

    if (this.validation.required) {
      isValid = value !== '';

      this.validity.required = !isValid;
    }

    if (this.validation.pattern) {
      const regex = RegExp(this.validation.pattern);

      isValid = regex.test(value) && isValid;

      this.validity.pattern = !isValid;
    }

    if (this.validation.minLength) {
      isValid = value.length >= this.validation.minLength && isValid;

      this.validity.minLength = !isValid;
    }

    return isValid;
  };

  validation;

  errorMessage;

  render() {
    const classes = [];
    const {
      focussed,
      valid,
      touched,
      hasText,
    } = this.state;
    const { label, type, validation } = this.props;

    if (focussed) {
      classes.push('focussed');
    }

    if (!valid && touched) {
      classes.push('has-error');
    }

    if (this.validity.required) {
      this.errorMessage = `${label} is required.`;
    } else if (this.validity.pattern || this.validity.minLength) {
      this.errorMessage = `Please enter a valid ${label}`;
    }

    return (
      <div className={`form-input ${classes.join(' ')}`}>
        <label
          className={
            `form-input__label${hasText ? ' has-text' : ''}`
          }
        >
          {label}
        </label>
        <input
          onChange={this.onInputChanged}
          onFocus={this.onInputFocussed}
          onBlur={this.onInputBlurred}
          type={type}
          required={validation.required}
          minLength={
            validation.minLength
              ? validation.minLength
              : 0
          }
          className="form-input__input"
        />
        <CSSTransition
          classNames="error"
          timeout={250}
          in={touched && !valid}
          mountOnEnter
          unmountOnExit
        >
          <p className="form-input__error-message">{this.errorMessage}</p>
        </CSSTransition>
        <span className="form-input__status" />
      </div>
    );
  }
}

export default Input;
