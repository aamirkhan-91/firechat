import React from "react";

// import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.png";

import "./Header.scss";

const header = props => {
  let image = <img onClick={props.viewContactDetails} src={pp} className="thumbnail" />;

  if (props.contact.photoUrl) {
    image = <img onClick={props.viewContactDetails} src={props.contact.photoUrl} className="thumbnail" />;
  }

  return (
    <header className="chat-header">
      {image}
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
};

export default header;
