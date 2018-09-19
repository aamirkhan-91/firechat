import React, { Component } from "react";

import { Link } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import firebase, { firestore } from "@/config/firebase";

import Loader from '@/utilities/Loader/Loader';

class Signup extends Component {
  state = {
    signupForm: {
      fields: [
        {
          name: "name",
          label: "Full Name",
          type: "text",
          validation: {
            required: true,
            pattern: /^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$/
          },
          value: "",
          valid: false
        },
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
        }
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
      .createUserWithEmailAndPassword(
        this.state.signupForm.fields[1].value,
        this.state.signupForm.fields[2].value
      )
      .then(response => {
        firestore
          .collection("users")
          .doc(response.user.uid)
          .set({
            uid: response.user.uid,
            fullName: this.state.signupForm.fields[0].value,
            email: response.user.email
          });

        this.setState({
          loading: false
        });
      })
      .catch(() => {});
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
    return <div className="auth__card">
        <div className="auth__card__header">Create Account</div>

        <div>
          {this.state.signupForm.fields.map(field => (
            <Input
              name={field.name}
              changed={this.inputChangedHandler}
              label={field.label}
              type={field.type}
              required={field.required}
              validation={field.validation}
            />
          ))}
        </div>

        <Button clicked={this.submitHandler} disabled={!this.state.signupForm.isValid} text="Submit" />

        <span>
          Already have an account? <Link to="/auth/signin">Sign In.</Link>
        </span>

        <Loader show={this.state.loading} overlay={true} transition={true} />
      </div>;
  }
}

export default Signup;
