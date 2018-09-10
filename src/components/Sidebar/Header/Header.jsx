import React from "react";

import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.png";

import "./Header.scss";

const sidebarHeader = props => {
  return (
    <header className="sidebar-header">
      <img className="thumbnail" src={pp} />

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
