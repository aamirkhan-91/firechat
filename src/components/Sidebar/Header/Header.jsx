import React from "react";

import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.png";

import "./Header.scss";

const sidebarHeader = props => {

  let image = <img className="thumbnail" src={pp} />;

  if (props.user) {
    if (props.user.photoUrl) {
      image = <img className="thumbnail" src={props.user.photoUrl} />
    }
  }

  return (
    <header className="sidebar-header">
      {image}

      <div>
        <Dropdown iconName="fa-ellipsis-v">
          {/* <span>Profile</span>
            <span>Settings</span> */}
          <span onClick={props.onLogout} >Logout</span>
        </Dropdown>
      </div>
    </header>
  );
}

export default sidebarHeader;
