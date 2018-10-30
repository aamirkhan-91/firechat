import React, { Component } from "react";

import Header from "./Header/Header";
import Input from "./Input/Input";

import Message from './Message/Message';

import Aux from '../../utilities/Auxillary';

import moment from 'moment';

import "./Chat.scss";

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { firestore, _firebase } from "../../config/firebase";

class Chat extends Component {

  componentDidMount() {
    if (this.props.selectedContact && !this.props.selectedContact.chat) {
      firestore.collection('chats').add({
        members: [this.props.selectedContact.uid, this.props.currentUser.uid],
        messages: []
      });
    }
  }

  sendMessageHandler = (message) => {
    firestore.collection('chats').doc(this.props.selectedContact.chat.id).update({
      messages: _firebase.firestore.FieldValue.arrayUnion({
        sender: this.props.currentUser.uid,
        receiver: this.props.selectedContact.uid,
        message: message,
        timestamp: new Date()
      })
    });
  }

  render() {
    if (this.props.selectedContact.chat) {
      let currentDate;
      let messages = this.props.selectedContact.chat.messages ? this.props.selectedContact.chat.messages : [];

      if (messages.length) {
        currentDate = moment(messages[0].timestamp);
      }

      return (
        <div className="chat">
          <Header contact={this.props.selectedContact} />
          <div className="chat__messages">
            { messages.length ? <div className="chat__messages__date">{relativeDate(currentDate)}</div> : null }
            { messages.length ?  messages.map(message => {
              let date = moment(message.timestamp);

              if (!date.isSame(currentDate, 'day')) {
                currentDate = date;
                return (
                  <Aux>
                    <div className="chat__messages__date">{relativeDate(currentDate)}</div>
                    <Message currentUser={this.props.currentUser} message={message} />
                  </Aux>
                );
              } else {
                return <Message currentUser={this.props.currentUser} message={message} />
              }
            }) : null }
          </div>
          <Input send={this.sendMessageHandler} />
        </div>
      );
    } else {
      return (
        <div className={"chat" + (this.props.sidebarVisible ? ' translated' : '')}>
          <Header contact={this.props.selectedContact} />
          <div className="chat__messages"></div>
          <Input send={this.sendMessageHandler} />
        </div>
      );
    }
  }
}

function relativeDate(date) {
  let today = moment();

  if (today.isSame(date, 'day')) {
    return 'TODAY';
  } else if (today.subtract(1, 'days').isSame(date, 'day')) {
    return 'YESTERDAY';
  } else return date.format('DD/MM/YYYY');
}

const mapStateToProps = state => {
  return {
    currentUser: state.user,
    selectedContact: state.contacts.selectedContact
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => dispatch({ type: actions.SET_SIDEBAR_VISIBLE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);