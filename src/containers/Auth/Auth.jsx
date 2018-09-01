import React from "react";
import { Route, Redirect } from "react-router-dom";

import Signup from "./Signup";
import Signin from "./Signin";

import "./Auth.scss";

const auth = props => {
  return (
    <div className="auth">
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
    </div>
  );
}

export default auth;
