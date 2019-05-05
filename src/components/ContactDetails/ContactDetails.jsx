import React from 'react';

import pp from '../../assets/pp.png';

import './ContactDetails.scss';

const contactDetails = ({ contact }) => (
  <div className="contact-details">
    <div className="contact-details__profile-picture">
      {contact.photoURL ? <img src={contact.photoURL} /> : <img src={pp} /> }
    </div>

    <div className="contact-details__info">
      <p className="contact-details__info__name">
        <i className="fa fa-2x fa-user-circle" />
        <span>{contact.fullName}</span>
      </p>
      <p className="contact-details__info__email">
        <i className="fa fa-2x fa-envelope" />
        <span>{contact.email}</span>
      </p>
    </div>

  </div>
);

export default contactDetails;
