import React from 'react'

import Loader from '../../../utilities/Loader/Loader';
import Contact from './Contact/Contact';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import './ContactList.scss';

const  ContactList = props => {
  let filteredContacts = props.contacts.filter(contact => contact.fullName.toUpperCase().includes(props.search.toUpperCase()));

  return (
    <div className="contact-list">
      <Loader show={props.loading} transition={true} overlay={true} />

      { filteredContacts.map(contact => <Contact clicked={() => props.setSelectedContact(contact)} key={contact.uid} contact={contact} />) }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts.list,
    loading: state.contacts.loading,
    search: state.contacts.search
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedContact: (contact) => {
      if (window.innerWidth <= 900) {
        dispatch({ type: actions.SET_SIDEBAR_VISIBLE });
      }

      dispatch({ type: actions.SET_SELECTED_CONTACT, contact: contact })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
