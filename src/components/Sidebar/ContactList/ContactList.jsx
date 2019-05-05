import React from 'react';

import { connect } from 'react-redux';
import Loader from '../../../utilities/Loader/Loader';
import Contact from './Contact/Contact';


import * as actions from '../../../store/actions';

import './ContactList.scss';

const ContactList = ({
  contacts, loading, setSelectedContact, search,
}) => {
  const filteredContacts = contacts.filter(contact => contact.fullName.toUpperCase().includes(search.toUpperCase()));

  return (
    <div className="contact-list">
      <Loader show={loading} transition overlay />

      { filteredContacts.map(contact => <Contact clicked={() => setSelectedContact(contact)} key={contact.uid} contact={contact} />) }
    </div>
  );
};

const mapStateToProps = state => ({
  contacts: state.contacts.list,
  loading: state.contacts.loading,
  search: state.contacts.search,
});

const mapDispatchToProps = dispatch => ({
  setSelectedContact: (contact) => {
    if (window.innerWidth <= 900) {
      dispatch({ type: actions.SET_SIDEBAR_VISIBLE });
    }

    dispatch({ type: actions.SET_SELECTED_CONTACT, contact });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
