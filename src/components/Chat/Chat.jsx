import React from "react";

import Header from "./Header/Header";
import Input from "./Input/Input";

import Message from './Message/Message';

import Aux from '@/utilities/Auxillary';

import moment from 'moment';

import "./Chat.scss";

const chat = props => {

  let currentDate;
  if (props.messages.length) {
    currentDate = moment(props.messages[0].timestamp).format('DD/MM/YYYY');
    debugger;
  }

  return (
    <div className="chat">
      <Header contact={props.selectedContact} />
      <div className="chat__messages">
        { props.messages.length ? <div className="chat__messages__date">{currentDate}</div> : null }
        { props.messages.length ? props.messages.map(message => {
          let date = moment(message.timestamp).format('DD/MM/YYYY');

          if (date !== currentDate) {
            currentDate = date;
            return (
              <Aux>
                <div className="chat__messages__date">{currentDate}</div>
                <Message currentUser={props.currentUser} message={message} />
              </Aux>
            );
          } else {
            return <Message currentUser={props.currentUser} message={message} />
          }
        }) : null }
      </div>
      <Input send={props.onSendMessage} />
    </div>
  );
};

export default chat;