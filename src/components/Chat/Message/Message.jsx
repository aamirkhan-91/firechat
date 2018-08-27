import React from 'react';

import './Message.scss';

const message = props => (
  <div className='message'>
    {props.message}
  </div>
)

export default message;