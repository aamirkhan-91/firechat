import React, { Component } from "react";

import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.jpg";

import "./Header.scss";

class SidebarHeader extends Component {
  state = {};
  render() {
    return (
      <header className="sidebar-header">
        <img className="thumbnail" src={pp} />
        {/* {this.props.user ? <h3>{this.props.user.fullName}</h3> : null } */}

        {/* <div className="icon">
          <i className="fa fa-plus" />
        </div> */}
        <div>
          <Dropdown iconName="fa-ellipsis-v">
            <span>Profile</span>
            <span>Settings</span>
            <span>Logout</span>
          </Dropdown>
        </div>
      </header>
    );
  }
}

export default SidebarHeader;
