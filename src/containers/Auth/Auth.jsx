import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Signup from "./Signup";
import Signin from "./Signin";

import "./Auth.scss";

const auth = props => (
  <div className="auth">
    <Switch location={location}>
      <Route
        exact
        path={props.match.url + "/signup"}
        component={Signup}
      />
      <Route
        exact
        path={props.match.url + "/signin"}
        component={Signin}
      />
      <Route
        exact
        path={props.match.url}
        render={() => <Redirect to={props.match.url + "/signup"} />}
      />
    </Switch>
  </div>
);

export default auth;
