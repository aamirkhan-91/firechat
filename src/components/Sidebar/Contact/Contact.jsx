import React from "react";

import pp from "../../../assets/pp.png";

import "./Contact.scss";

const contact = props => {
  let image = <img src={pp} className="thumbnail" />;

  if (props.contact.photoUrl) {
    image = <img src={props.contact.photoUrl} className="thumbnail" />;
  }

  return (
    <div onClick={props.clicked} className="contact">
      {image}
      <div>
        <h3>{props.contact.fullName}</h3>
        {/* <p>Some text...</p> */}

        {/* <i className='fa fa-caret-right'></i> */}
      </div>
    </div>
  );
};

export default contact;
