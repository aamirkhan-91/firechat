import React, { Component } from "react";
// import { hot } from "react-hot-loader";
import { Route, Redirect, withRouter } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Auth from "./containers/Auth/Auth";

import { connect } from 'react-redux';
import * as actions from './store/actions';

import Loader from "./utilities/Loader/Loader";

import firebase, { registerChatListener, registerContactsListener } from "./config/firebase";

class App extends Component {
  state = {
    initialLoad: true
  }

  registerAuthenticationListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.displayName) {
          this.props.setUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid
          });
        }

        registerContactsListener(user.uid);
        registerChatListener(user.uid);
      } else {
        this.props.setUser(null);
      }

      this.setState({
        initialLoad: false
      });
    });
  }

  componentDidMount() {
    this.registerAuthenticationListener();
  }

  render() {
    let authenticated = this.props.current_user ? true : false;
    let authRedirect = '/auth';

    if (!authenticated) {
      if (this.props.location.pathname.includes('auth')) {
        authRedirect = this.props.location.pathname;
      }
    }

    let content = !this.state.initialLoad ? [
      <Route render={() => (
        authenticated? <Redirect to="/" /> : <Redirect to={authRedirect} />
      )} />,

      <Route exact path="/" component={Layout} />,
      <Route path="/auth" component={Auth} />
    ] : null;

    return (
      [
        content,
        <Loader show={this.state.initialLoad} />
      ]
    );
  }
}

const mapStateToProps = state => {
  return {
    current_user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch({ type: actions.SET_USER, user }),
    setContacts: (contacts) => dispatch({ type: actions.SET_CONTACTS, contacts })
  }
}

/* eslint-disable */
// export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
