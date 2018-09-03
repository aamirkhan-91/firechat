import React, { Component } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";

import SidebarTrigger from '@/utilities/SidebarTrigger/SidebarTrigger';

import firebase, { firestore } from "@/config/firebase";
import _firebase from "firebase";

import './Layout.scss';

export default class Layout extends Component {
  state = {
    contacts: [],
    filteredContacts: [],
    selectedContact: null,
    loadingContacts: false,
    currentUser: null,
    messages: [],
    chatId: null,
    sidebarVisible: false
  };

  logoutHandler() {
    firebase.auth().signOut();
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;

    if (user) {
      this.setState({
        loadingContacts: true
      });

      firestore.collection('users').onSnapshot((snapshot) => {
        let currentUser;

        let contacts = [];
        snapshot.forEach(doc => {
          let contact = doc.data();

          if (contact.uid !== user.uid) {
            contacts.push(doc.data());
          } else {
            currentUser = contact;
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
    this.setState({
      selectedContact: contact
    });

    firestore.collection('chats')
      .where("members", "array-contains", this.state.currentUser.uid)
      .onSnapshot(chats => {
        let chatWithSelectedContact = null;
        let chatId = null;

        chats.forEach(chatData => {
          let chat = chatData.data();

          if (chat.members.includes(contact.uid)) {
            chatWithSelectedContact = chat;
            chatId = chatData.ref.id;
          }
        });

        if (!chatWithSelectedContact) {
          firestore.collection('chats').add({
            members: [contact.uid, this.state.currentUser.uid],
            messages: []
          });
        } else {
          let messages = chatWithSelectedContact.messages;

          this.setState({
            messages: messages,
            chatId: chatId
          });
        }
    });

    if (window.innerWidth <= 900) {
      this.setState({
        sidebarVisible: false
      });
    }
  }

  sendMessageHandler = (message) => {
    firestore.collection('chats').doc(this.state.chatId).update({
      messages: _firebase.firestore.FieldValue.arrayUnion({
        sender: this.state.currentUser.uid,
        receiver: this.state.selectedContact.uid,
        message: message,
        timestamp: new Date()
      })
    });
  }

  toggleSidebar = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }

  render() {
    return (
      <div className="container">
        <SidebarTrigger clicked={this.toggleSidebar} />
        <Sidebar
          visible={this.state.sidebarVisible}
          onLogout={this.logoutHandler}
          user={this.state.currentUser}
          filterHandler={this.contactFilterChangeHandler}
          loading={this.state.loadingContacts}
          contacts={this.state.filteredContacts}
          onContactSelected={this.contactSelectedHandler} />
        {
          this.state.selectedContact ?
          <Chat
            onSendMessage={this.sendMessageHandler}
            messages={this.state.messages}
            selectedContact={this.state.selectedContact}
            currentUser={this.state.currentUser} /> : <div className="no-contact"> Select a Contact to get started! </div> }
      </div>
    );
  }
}
