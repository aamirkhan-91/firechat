import React from 'react';

import { connect } from 'react-redux';
import Header from './Header/Header';
import Search from './Search/Search';
import ContactList from './ContactList/ContactList';


import './Sidebar.scss';

const sidebar = ({ visible, onLogout, currentUser }) => {
  const classes = ['sidebar'];

  if (window.innerWidth <= 900) {
    if (visible) {
      classes.push('visible');
    }
  }

  return (
    <div className={classes.join(' ')}>
      <Header onLogout={onLogout} user={currentUser} />
      <Search />

      <ContactList />
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user,
});

export default connect(mapStateToProps)(sidebar);
