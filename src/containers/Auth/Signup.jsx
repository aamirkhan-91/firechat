import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import firebase, { firestore, uploadPhoto, createUser } from '../../config/firebase';

import Loader from '../../utilities/Loader/Loader';
import ToastContainer from '../../utilities/Toast/ToastContainer';

import AvatarEditor from '../../utilities/AvatarEditor/AvatarEditor';

class Signup extends Component {
  state = {
    signupForm: {
      fields: [
        {
          name: 'name',
          label: 'Full Name',
          type: 'text',
          validation: {
            required: true,
            pattern: /^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$/,
          },
          value: '',
          valid: false,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          validation: {
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
          value: '',
          valid: false,
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          validation: {
            required: true,
            minLength: 8,
          },
          minLength: 8,
          value: '',
          valid: false,
        },
      ],
      isValid: false,
    },
    loading: false,
    imageBlob: null,
  };

  toastContainerRef = React.createRef();

  getFormFieldByName = (fields, name) => {
    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i].name === name) {
        return i;
      }
    }

    return -1;
  }

  createUser = () => {
    this.setState({
      loading: true,
    });

    const { imageBlob, signupForm } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        signupForm.fields[1].value,
        signupForm.fields[2].value,
      )
      .then((response) => {
        const userDoc = firestore.collection('users').doc(response.user.uid);

        userDoc.set({
          uid: response.user.uid,
          fullName: signupForm.fields[0].value,
          email: response.user.email,
        })
          .then(() => {
            uploadPhoto(`profile-pictures/${response.user.uid}`, imageBlob)
              .then((downloadUrl) => {
                userDoc.update({
                  photoURL: downloadUrl,
                });

                response.user.updateProfile({
                  displayName: signupForm.fields[0].value,
                  photoURL: downloadUrl,
                });
              });
          });

        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });

        this.handleAuthError(error);
      });
  }

  inputChangedHandler = (inputIdentifier, isValid, value) => {
    const { signupForm } = this.state;

    const fieldIndex = this.getFormFieldByName(signupForm.fields, inputIdentifier);

    signupForm.fields[fieldIndex].valid = isValid;
    signupForm.fields[fieldIndex].value = value;

    signupForm.isValid = this.checkFormValid(signupForm);

    this.setState({
      signupForm,
    });
  };

  submitHandler = () => {
    this.setState({ loading: true });

    const { signupForm, imageBlob } = this.state;

    createUser({
      fullName: signupForm.fields[0].value,
      email: signupForm.fields[1].value,
      password: signupForm.fields[2].value,
    }, imageBlob)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.handleAuthError(err);
      });
  };

  handleAuthError = (error) => {
    let message = 'An error has occurred. Please try again!';

    if (error.code === 'auth/email-already-in-use') {
      message = 'The email you have provided is already in use! Please try Signing in.';
    }

    this.toastContainerRef.current.addErrorToast('Error', message);
  }

  imageReady = (imageBlob) => {
    this.setState({
      imageBlob,
    }, () => {
      const { signupForm } = this.state;
      signupForm.isValid = this.checkFormValid(signupForm);

      this.setState({ signupForm });
    });
  }

  checkFormValid = (form) => {
    let isFormValid = true;
    const { imageBlob } = this.state;

    if (!imageBlob) {
      return false;
    }

    const { fields } = form;

    fields.forEach((field) => {
      if (!field.valid && isFormValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  render() {
    const { signupForm, loading } = this.state;

    return (
      <div className="auth__card">
        <div className="auth__card__header">Create Account</div>

        <div>
          {signupForm.fields.map(field => (
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

        <AvatarEditor onImageReady={this.imageReady} />
        <Button block clicked={this.submitHandler} disabled={!signupForm.isValid} text="Submit" />

        <span>
            Already have an account?
          {' '}
          <Link to="/auth/signin">Sign In.</Link>
        </span>

        <Loader show={loading} overlay transition />

        <ToastContainer ref={this.toastContainerRef} />
      </div>
    );
  }
}

export default Signup;
