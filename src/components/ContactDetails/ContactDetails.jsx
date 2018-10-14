import React from 'react'

import pp from '../../assets/pp.png';

import './ContactDetails.scss';

const contactDetails = props => (
  <div className="contact-details">
    <div className="contact-details__profile-picture">
      {props.contact.photoUrl ? <img src={props.contact.photoUrl} /> : <img src={pp} /> }
    </div>

    <div className="contact-details__info">
      <p className="contact-details__info__name">
        <i className="fa fa-2x fa-user-circle"></i>
        <span>{props.contact.fullName}</span>
      </p>
      <p className="contact-details__info__email">
        <i className="fa fa-2x fa-envelope"></i>
        <span>{props.contact.email}</span>
      </p>
    </div>

  </div>
)

export default contactDetails;