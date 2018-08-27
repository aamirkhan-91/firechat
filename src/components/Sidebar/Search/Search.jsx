import React from "react";

import "./Search.scss";

const search = props => (
  <div className="contact-search">
    <i className="fa fa-search" />
    <input onChange={props.changed} placeholder="Filter Contacts" />
  </div>
);

export default search;
