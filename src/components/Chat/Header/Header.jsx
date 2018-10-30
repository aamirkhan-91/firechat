import React from "react";

// import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.png";

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import "./Header.scss";
import SidebarTrigger from "../../../utilities/SidebarTrigger/SidebarTrigger";

const header = props => {
  if (props.contact) {
    let image = <img onClick={props.viewContactDetails} src={pp} className="thumbnail" />;

    if (props.contact.photoURL) {
      image = <img onClick={props.viewContactDetails} src={props.contact.photoURL} className="thumbnail" />;
    }

    return (
      <header className="chat-header">
        <SidebarTrigger clicked={props.toggleSidebar} />
        { image }
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
  } else {
    return (
      <header className="chat-header">
        <SidebarTrigger clicked={props.toggleSidebar} />
      </header>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    viewContactDetails: () => dispatch({ type: actions.VIEW_CONTACT_DETAILS, view: true }),
    toggleSidebar: () => dispatch({ type: actions.SET_SIDEBAR_VISIBLE })
  }
}

export default connect(null, mapDispatchToProps)(header);
