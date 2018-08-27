import React, { Component } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";

import firebase from "@/config/firebase";

import './Layout.scss';

export default class Layout extends Component {
  state = {
    contacts: [],
    filteredContacts: [],
    selectedContact: null,
    loadingContacts: false,
    currentUser: null,
    messages: []
  };

  componentDidMount() {
    let user = firebase.auth().currentUser;

    if (user) {
      this.setState({
        loadingContacts: true
      });

      firebase.database().ref('users').once('value').then((snapshot) => {

        let data = snapshot.val();
        let keys = Object.keys(data);

        let currentUser;

        let contacts = [];
        keys.forEach(key => {
          if (data[key].uid !== user.uid) {
            contacts.push(data[key]);
          } else {
            currentUser = data[key];
          }
        });

        this.setState({
          contacts: contacts,
          filteredContacts: contacts,
          loadingContacts: false,
          currentUser: currentUser
        });
      });
    }
  }

  contactFilterChangeHandler = (event) => {
    let search = event.target.value;

    if (!search) {
      this.setState({
        filteredContacts: this.state.contacts
      })
    }

    let filteredContacts = [];

    this.state.contacts.forEach(contact => {
      if (contact.fullName.toUpperCase().includes(search.toUpperCase())) {
        filteredContacts.push(contact);
      }
    });

    this.setState({
      filteredContacts: filteredContacts
    })
  }

  contactSelectedHandler = (contact) => {
    debugger;
    this.setState({
      selectedContact: contact
    });

    firebase.database().ref('chats/' + this.state.currentUser.uid + '/' + contact.uid).on('value', (data) => {
      let messagesData = data.val();
      let keys = Object.keys(messagesData);

      let messages = [];
      keys.forEach(key => {
        messages.push(messagesData[key]);
      });

      this.setState({
        messages: messages
      });
    });
  }

  sendMessageHandler = (message) => {
    firebase.database().ref('chats/' + this.state.currentUser.uid + '/' + this.state.selectedContact.uid).push({
      sender: this.state.currentUser.uid,
      recipient: this.state.selectedContact.uid,
      message: message
    });
  }

  render() {
    return (
      <div className="container">
        <Sidebar user={this.state.currentUser} filterHandler={this.contactFilterChangeHandler} loading={this.state.loadingContacts} contacts={this.state.filteredContacts} onContactSelected={this.contactSelectedHandler} />
        {this.state.selectedContact ? <Chat onSendMessage={this.sendMessageHandler} messages={this.state.messages} selectedContact={this.state.selectedContact} /> : <div className="no-contact">Select a Contact to get started!</div> }
      </div>
    );
  }
}
