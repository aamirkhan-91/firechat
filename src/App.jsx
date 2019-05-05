import React, { Component } from 'react';
// import { hot } from "react-hot-loader";
import { Route, Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';

import * as actions from './store/actions';

import Loader from './utilities/Loader/Loader';

import firebase, { registerChatListener, registerContactsListener } from './config/firebase';

class App extends Component {
  state = {
    initialLoad: true,
  }

  componentDidMount() {
    this.registerAuthenticationListener();
  }

  registerAuthenticationListener = () => {
    const { setUser } = this.props;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName) {
          setUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          });
        }

        registerContactsListener(user.uid);
        registerChatListener(user.uid);
      } else {
        setUser(null);
      }

      this.setState({
        initialLoad: false,
      });
    });
  }

  render() {
    const { currentUser, location } = this.props;
    const { initialLoad } = this.state;

    // const authenticated = currentUser;
    let authRedirect = '/auth';

    if (!currentUser) {
      if (location.pathname.includes('auth')) {
        authRedirect = location.pathname;
      }
    }

    const content = !initialLoad ? [
      <Route render={() => (
        currentUser ? <Redirect to="/" /> : <Redirect to={authRedirect} />
      )}
      />,

      <Route exact path="/" component={Layout} />,
      <Route path="/auth" component={Auth} />,
    ] : null;

    return (
      [
        content,
        <Loader show={initialLoad} />,
      ]
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({ type: actions.SET_USER, user }),
  setContacts: contacts => dispatch({ type: actions.SET_CONTACTS, contacts }),
});

// export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
