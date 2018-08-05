import React from "react";

import pp from "../../../assets/pp.jpg";

import "./Contact.scss";

const contact = props => (
  <div className="contact">
    <img src={pp} className="thumbnail" />
    <div>
      <h3>{props.name}</h3>
      <p>Some text...</p>

      {/* <i className='fa fa-caret-right'></i> */}
    </div>
  </div>
);

export default contact;
