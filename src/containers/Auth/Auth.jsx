import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import posed, { PoseGroup } from 'react-pose';

import Signup from "./Signup";
import Signin from "./Signin";

import "./Auth.scss";

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 400, x: 0, applyAtStart: { x: '-100%', scale: 1 }, transition: { duration: 350 } },
  exit: { opacity: 0, scale: 0, transition: { duration: 350 } }
});

const auth = props => {
  return (
    <div className="auth">
    <Route render={({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key} >
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
        </RouteContainer>
      </PoseGroup>
    )} />
    </div>
  );
}

export default auth;
