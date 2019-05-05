import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Signup from './Signup';
import Signin from './Signin';

import './Auth.scss';

const auth = ({ match }) => (
  <div className="auth">
    <Switch location={window.location}>
      <Route
        exact
        path={`${match.url}/signup`}
        component={Signup}
      />
      <Route
        exact
        path={`${match.url}/signin`}
        component={Signin}
      />
      <Route
        exact
        path={match.url}
        render={() => <Redirect to={`${match.url}/signup`} />}
      />
    </Switch>
  </div>
);

export default auth;
