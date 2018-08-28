import React, { Component } from "react";

import { Link } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import firebase, { firestore } from "@/config/firebase";

import Loader from '@/utilities/Loader/Loader';

class Signup extends Component {
  state = {
    signupForm: {
      name: {
        name: "name",
        label: "Full Name",
        type: "text",
        validation: {
          required: true
        },
        value: "",
        valid: false
      },
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
    },
    loading: false
  };

  inputChangedHandler = (inputIdentifier, isValid, value) => {
    const form = { ...this.state.signupForm };

    form[inputIdentifier].valid = isValid;
    form[inputIdentifier].value = value;

    this.setState({
      signupForm: form
    });

    this.checkFormValid();
  };

  submitHandler = () => {
    this.setState({
      loading: true
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.signupForm.email.value,
        this.state.signupForm.password.value
      )
      .then(response => {
        firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            uid: response.user.uid,
            fullName: this.state.signupForm.name.value,
            email: response.user.email
          });

          this.setState({
            loading: false
          });
      })
      .catch(() => {
      });
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
        <div className="auth__card__header">Create Account</div>

        <div>
          <Input
            name={this.state.signupForm.name.name}
            changed={this.inputChangedHandler}
            label={this.state.signupForm.name.label}
            type={this.state.signupForm.name.type}
            required={this.state.signupForm.name.required}
            validation={this.state.signupForm.name.validation}
          />
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

        <Button
          clicked={this.submitHandler}
          disabled={this.state.signupForm.isValid}
          text="Submit"
        />

        <span>
          Already have an account? <Link to="/auth/signin">Sign In.</Link>
        </span>

        <Loader show={this.state.loading} overlay={true} transition={true} />
      </div>
    );
  }
}

export default Signup;
