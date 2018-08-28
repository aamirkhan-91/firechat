import React from 'react';

import './Message.scss';

const message = props => (
  <div className={'message ' + (props.currentUser.uid === props.message.sender ? 'sender' : null)}>
    {props.message.message}
  </div>
)

export default message;