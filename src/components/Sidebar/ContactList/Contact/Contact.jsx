import React from 'react';

import * as moment from 'moment';
import pp from '../../../../assets/pp.png';


import './Contact.scss';

const Contact = ({ contact, clicked }) => {
  let image = <img src={pp} className="thumbnail" />;

  if (contact.photoURL) {
    image = <img src={contact.photoURL} className="thumbnail" />;
  }

  const lastMessage = contact.chat ? (contact.chat.messages.length ? contact.chat.messages[contact.chat.messages.length - 1].message : 'Tap to start a conversation') : 'Tap to start a conversation';
  const timeStamp = contact.chat ? (contact.chat.messages.length ? moment(contact.chat.messages[contact.chat.messages.length - 1].timestamp).format('hh:mm A') : null) : null;

  return (
    <div onClick={clicked} className="contact">
      {image}
      <div>
        <h3>{contact.fullName}</h3>
        <p>
          {' '}
          { lastMessage }
          {' '}
        </p>

      </div>
      {/* <i className='contact__chevron fa fa-chevron-down'></i> */}
      <span className="contact__timestamp">{timeStamp}</span>
    </div>
  );
};

export default Contact;
