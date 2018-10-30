import React from "react";

import pp from "../../../../assets/pp.png";

import "./Contact.scss";

const contact = props => {
  let image = <img src={pp} className="thumbnail" />;

  if (props.contact.photoURL) {
    image = <img src={props.contact.photoURL} className="thumbnail" />;
  }

  let lastMessage = props.contact.chat ? (props.contact.chat.messages.length ? props.contact.chat.messages[props.contact.chat.messages.length - 1].message : 'Tap to start a conversation') : 'Tap to start a conversation';

  return (
    <div onClick={props.clicked} className="contact">
      {image}
      <div>
        <h3>{props.contact.fullName}</h3>
        <p> { lastMessage } </p>

        {/* <i className='fa fa-caret-right'></i> */}
      </div>
    </div>
  );
};

export default contact;
