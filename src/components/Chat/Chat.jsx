import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import Header from './Header/Header';
import Input from './Input/Input';

import Message from './Message/Message';

import Aux from '../../utilities/Auxillary';


import './Chat.scss';

import * as actions from '../../store/actions';
import { firestore, _firebase } from '../../config/firebase';

function relativeDate(date) {
  const today = moment();

  if (today.isSame(date, 'day')) {
    return 'TODAY';
  } if (today.subtract(1, 'days').isSame(date, 'day')) {
    return 'YESTERDAY';
  } return date.format('DD/MM/YYYY');
}

class Chat extends Component {
  chatMessagesRef = React.createRef();

  componentDidMount() {
    const { selectedContact, currentUser } = this.props;

    if (selectedContact && !selectedContact.chat) {
      firestore.collection('chats').add({
        members: [selectedContact.uid, currentUser.uid],
        messages: [],
      });
    }

    this.scrollToBottom();
  }

  componentDidUpdate() {
    if (this.chatMessagesRef) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.chatMessagesRef.scrollTop = this.chatMessagesRef.scrollHeight - this.chatMessagesRef.clientHeight;
  }

  sendMessageHandler = (message) => {
    const { selectedContact, currentUser } = this.props;

    firestore.collection('chats').doc(selectedContact.chat.id).update({
      messages: _firebase.firestore.FieldValue.arrayUnion({
        sender: currentUser.uid,
        receiver: selectedContact.uid,
        message,
        timestamp: new Date(),
      }),
    });

    this.scrollToBottom();
  }

  render() {
    const { selectedContact, currentUser, sidebarVisible } = this.props;

    if (selectedContact.chat && currentUser) {
      let currentDate;
      const messages = selectedContact.chat.messages ? selectedContact.chat.messages : [];

      if (messages.length) {
        currentDate = moment(messages[0].timestamp);
      }

      return (
        <div className="chat">
          <Header contact={selectedContact} />
          <div ref={ref => this.chatMessagesRef = ref} className="chat__messages">
            { messages.length ? <div className="chat__messages__date">{relativeDate(currentDate)}</div> : null }
            { messages.length ? messages.map((message) => {
              const date = moment(message.timestamp);

              if (!date.isSame(currentDate, 'day')) {
                currentDate = date;
                return (
                  <Aux key={message.timestamp.getTime()}>
                    <div className="chat__messages__date">{relativeDate(currentDate)}</div>
                    <Message currentUser={currentUser} message={message} />
                  </Aux>
                );
              }
              return <Message key={message.timestamp.getTime()} currentUser={currentUser} message={message} />;
            }) : null }
          </div>
          <Input send={this.sendMessageHandler} />
        </div>
      );
    }
    return (
      <div className={`chat${sidebarVisible ? ' translated' : ''}`}>
        <Header contact={selectedContact} />
        <div className="chat__messages" />
        <Input send={this.sendMessageHandler} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user,
  selectedContact: state.contacts.selectedContact,
});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch({ type: actions.SET_SIDEBAR_VISIBLE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
