import React from "react";

import Header from "./Header/Header";
import Input from "./Input/Input";

import Message from './Message/Message';

import "./Chat.scss";

const chat = props => (
  <div className="chat">
    <Header contact={props.selectedContact} />
    <div className="chat__messages">
      { props.messages.length ? props.messages.map(message => (<Message message={message.message} />)) : null }
    </div>
    <Input send={props.onSendMessage} />
  </div>
);

export default chat;
