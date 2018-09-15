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
    currentDate = moment(props.messages[0].timestamp);
  }

  return (
    <div className={"chat" + (props.sidebarVisible ? ' translated' : '')}>
      <Header contact={props.selectedContact} />
      <div className="chat__messages">
        { props.messages.length ? <div className="chat__messages__date">{relativeDate(currentDate)}</div> : null }
        { props.messages.length ? props.messages.map(message => {
          let date = moment(message.timestamp);

          if (!date.isSame(currentDate, 'day')) {
            currentDate = date;
            return (
              <Aux>
                <div className="chat__messages__date">{relativeDate(currentDate)}</div>
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

function relativeDate(date) {
  let today = moment();

  if (today.isSame(date, 'day')) {
    return 'TODAY';
  } else if (today.subtract(1, 'days').isSame(date, 'day')) {
    return 'YESTERDAY';
  } else return date.format('DD/MM/YYYY');
}

export default chat;