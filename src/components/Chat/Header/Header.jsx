import React from "react";

import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.jpg";

import "./Header.scss";

const header = () => (
  <header className="chat-header">
    <img className="thumbnail" src={pp} />

    <div>
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
    </div>
  </header>
);

export default header;
