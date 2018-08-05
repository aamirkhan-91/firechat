import React, { Component } from "react";

import { Link } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

class Signin extends Component {
  state = {
    signupForm: {
      email: {
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
      password: {
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
      isValid: false
    }
  };

  inputChangedHandler = (inputIdentifier, isValid) => {
    const form = { ...this.state.signupForm };

    form[inputIdentifier].valid = isValid;

    this.setState({
      signupForm: form
    });

    this.checkFormValid();
  };

  checkFormValid() {
    // let signupForm = {...this.state.signupForm};
    // let isFormValid = true;
    // let test = Object.keys(signupForm)
    // .map((key) => {
    //     if ('valid' in signupForm[key]) {
    //         return true;
    //     }
    // });
    // signupForm.isValid = isFormValid;
    // this.setState({
    //     signupForm: signupForm
    // });
  }

  render() {
    return (
      <div className="auth__card">
        <div className="auth__card__header">Sign In</div>

        <div>
          <Input
            name={this.state.signupForm.email.name}
            changed={this.inputChangedHandler}
            label={this.state.signupForm.email.label}
            type={this.state.signupForm.email.type}
            required={this.state.signupForm.email.required}
            validation={this.state.signupForm.email.validation}
          />
          <Input
            name={this.state.signupForm.password.name}
            changed={this.inputChangedHandler}
            label={this.state.signupForm.password.label}
            type={this.state.signupForm.password.type}
            required={this.state.signupForm.password.required}
            validation={this.state.signupForm.password.validation}
          />
        </div>

        <Button disabled={this.state.signupForm.isValid} text="Submit" />

        <span>
          Already have an account? <Link to="/auth/signup">Sign Up.</Link>
        </span>
      </div>
    );
  }
}

export default Signin;
