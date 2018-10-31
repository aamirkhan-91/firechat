import React from "react";

import pp from "../../../../assets/pp.png";

import * as moment from 'moment';

import "./Contact.scss";

const contact = props => {
  let image = <img src={pp} className="thumbnail" />;

  if (props.contact.photoURL) {
    image = <img src={props.contact.photoURL} className="thumbnail" />;
  }

  let lastMessage = props.contact.chat ? (props.contact.chat.messages.length ? props.contact.chat.messages[props.contact.chat.messages.length - 1].message : 'Tap to start a conversation') : 'Tap to start a conversation';
  let timeStamp = props.contact.chat ? (props.contact.chat.messages.length ? moment(props.contact.chat.messages[props.contact.chat.messages.length - 1].timestamp).format('hh:mm A') : null) : null;

  return (
    <div onClick={props.clicked} className="contact">
      {image}
      <div>
        <h3>{props.contact.fullName}</h3>
        <p> { lastMessage } </p>

      </div>
      {/* <i className='contact__chevron fa fa-chevron-down'></i> */}
      <span className="contact__timestamp">{timeStamp}</span>
    </div>
  );
};

export default contact;
