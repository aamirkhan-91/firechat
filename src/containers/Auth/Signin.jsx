import React, { Component } from "react";

import { Link } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import Loader from "@/utilities/Loader/Loader";

import firebase from "@/config/firebase";
import ToastContainer from "../../utilities/Toast/ToastContainer";

class Signin extends Component {
  state = {
    signupForm: {
      fields: [
        {
          name: "email",
          label: "Email",
          type: "text",
          validation: {
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          },
          value: "",
          valid: false
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          validation: {
            required: true,
            minLength: 8
          },
          minLength: 8,
          value: "",
          valid: false
        },
      ],
      isValid: false
    },
    loading: false
  };

  toastContainerRef = React.createRef();

  getFormFieldByName(fields, name) {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].name === name) {
        return i;
      }
    }
  }

  inputChangedHandler = (inputIdentifier, isValid, value) => {
    const form = { ...this.state.signupForm };

    let fieldIndex = this.getFormFieldByName(form.fields, inputIdentifier);

    form.fields[fieldIndex].valid = isValid;
    form.fields[fieldIndex].value = value;

    form.isValid = this.checkFormValid(form);

    this.setState({
      signupForm: form
    });
  };

  submitHandler = () => {
    this.setState({
      loading: true
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.signupForm.fields[0].value,
        this.state.signupForm.fields[1].value
      )
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch((error) => {
        this.setState({
          loading: false
        });

        this.handleAuthError(error);
      });
  };

  handleAuthError(error) {
    let message = 'An error has occurred. Please try again!';

    if (error.code === 'auth/wrong-password') {
      message = 'You have provided an invalid password! Please try again.';
    } else if (error.code === 'auth/user-not-found') {
      message = 'You have provided an invalid email address! Please try again.';
    }

    this.toastContainerRef.current.addErrorToast('Error', message);
  }

  checkFormValid(form) {
    let isFormValid = true;

    let fields = form.fields;

    fields.forEach(field => {
      if (!field.valid && isFormValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  render() {
    return (
      <div className="auth__card">
        <div className="auth__card__header">Sign In</div>

        <div>
          {this.state.signupForm.fields.map(field => (
            <Input
              changed={this.inputChangedHandler}
              name={field.name}
              label={field.label}
              type={field.type}
              required={field.required}
              validation={field.validation}
            />
          ))}
        </div>

        <Button
          clicked={this.submitHandler}
          disabled={!this.state.signupForm.isValid}
          text="Submit"
        />

        <span>
          Already have an account? <Link to="/auth/signup">Sign Up.</Link>
        </span>
        <Loader transition={true} overlay={true} show={this.state.loading} />

        <ToastContainer ref={this.toastContainerRef} />
      </div>
    );
  }
}

export default Signin;
