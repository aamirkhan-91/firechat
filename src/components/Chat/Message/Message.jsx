import React from 'react';

import moment from 'moment';

import './Message.scss';

const Message = ({ currentUser, message }) => (
  <div className={`message ${currentUser.uid === message.sender ? 'sender' : ''}`}>
    {message.message}
    <span className="message__timestamp">
      {' '}
      {moment(message.timestamp).format('hh:mm A')}
      {' '}
    </span>
  </div>
);

export default Message;
