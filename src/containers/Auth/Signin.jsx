import React, { Component } from "react";

import { Link } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import Loader from "@/utilities/Loader/Loader";

import firebase from "@/config/firebase";

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
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
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
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

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
          <Input
            name={this.state.signupForm.fields[0].name}
            changed={this.inputChangedHandler}
            label={this.state.signupForm.fields[0].label}
            type={this.state.signupForm.fields[0].type}
            required={this.state.signupForm.fields[0].required}
            validation={this.state.signupForm.fields[0].validation}
          />
          <Input
            name={this.state.signupForm.fields[1].name}
            changed={this.inputChangedHandler}
            label={this.state.signupForm.fields[1].label}
            type={this.state.signupForm.fields[1].type}
            required={this.state.signupForm.fields[1].required}
            validation={this.state.signupForm.fields[1].validation}
          />
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
      </div>
    );
  }
}

export default Signin;
