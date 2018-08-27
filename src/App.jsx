import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Route, Redirect } from "react-router-dom";

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

    return (
      <Aux>
        {authenticated ? <Redirect to="/app" /> : <Redirect to="/auth" />}

        <Loader show={this.state.initialLoad} />

        <Route path="/app" component={Layout} />
        <Route path="/auth" component={Auth} />
      </Aux>
    );
  }
}

/* eslint-disable */
export default hot(module)(App);
