import React from "react";
import { hot } from "react-hot-loader";
import { Route, Redirect } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import Auth from "./containers/Auth/Auth";

import Aux from "./hoc/Auxillary";

const app = () => (
  <Aux>
    <Route path="/auth" component={Auth} />
    <Route path="/app" component={Layout} />
    <Route exact path="/" render={() => <Redirect to="/app" />} />
  </Aux>
);

/* eslint-disable */
export default hot(module)(app);
