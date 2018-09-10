import React from "react";

// import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.png";

import "./Header.scss";

const header = props => (
  <header className="chat-header">
    <img className="thumbnail" src={pp} />
    { props.contact ? <h3>{props.contact.fullName}</h3> : null }

    {/* <div>
      <div className="icon">
        <i className="fa fa-search" />
      </div>
      <div className="icon">
        <i className="fa fa-paperclip" />
      </div>
      <Dropdown iconName="fa-ellipsis-v">
        <span>Contact Info</span>
        <span>Clear Messages</span>
        <span>Delete Chat</span>
      </Dropdown>
    </div> */}
  </header>
);

export default header;
