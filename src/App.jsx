import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Route, Redirect, withRouter } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Auth from "./containers/Auth/Auth";

import Aux from "./utilities/Auxillary";
import Loader from "./utilities/Loader/Loader";

import firebase from "./config/firebase";

class App extends Component {
  state = {
    user: null,
    initialLoad: true
  };

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        });

        localStorage.setItem("user", user);
      } else {
        this.setState({
          user: null
        });

        localStorage.removeItem("user");
      }

      this.setState({
        initialLoad: false
      });
    });
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    let authenticated = this.state.user ? true : false;
    let authRedirect = '/auth';

    if (!authenticated) {
      if (this.props.location.pathname.includes('auth')) {
        authRedirect = this.props.location.pathname;
      }
    }

    let content = !this.state.initialLoad ? (
    <Aux>
      {authenticated ? <Redirect to="/app" /> : <Redirect to={authRedirect} />}

      <Route path="/app" component={Layout} />
      <Route path="/auth" component={Auth} />
    </Aux>) : null;

    return (
      <Aux>
        { content }
        <Loader show={this.state.initialLoad} />
      </Aux>
    );
  }
}

/* eslint-disable */
export default hot(module)(withRouter(App));
