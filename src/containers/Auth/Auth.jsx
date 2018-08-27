import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import Signup from "./Signup";
import Signin from "./Signin";

import "./Auth.scss";

class Auth extends Component {
  render() {
    return (
      <div className="auth">
        <Route
          exact
          path={this.props.match.url + "/signup"}
          component={Signup}
        />
        <Route
          exact
          path={this.props.match.url + "/signin"}
          component={Signin}
        />
        <Route
          exact
          path={this.props.match.url}
          render={() => <Redirect to={this.props.match.url + "/signup"} />}
        />
      </div>
    );
  }
}

export default Auth;
