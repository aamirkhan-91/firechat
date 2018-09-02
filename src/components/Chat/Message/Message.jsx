import React from 'react';

import moment from 'moment';

import './Message.scss';

const message = props => (
  <div className={'message ' + (props.currentUser.uid === props.message.sender ? 'sender' : null)}>
    {props.message.message}
    <span className='message__timestamp'> {moment(props.message.timestamp).format('hh:mm A')} </span>
  </div>
)

export default message;