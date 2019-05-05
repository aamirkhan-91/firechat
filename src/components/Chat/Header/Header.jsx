import React from 'react';

// import Dropdown from "../../UI/Dropdown/Dropdown";

import { connect } from 'react-redux';
import pp from '../../../assets/pp.png';

import * as actions from '../../../store/actions';

import './Header.scss';
import SidebarTrigger from '../../../utilities/SidebarTrigger/SidebarTrigger';

const header = ({ contact, viewContactDetails, toggleSidebar }) => {
  if (contact) {
    let image = <img onClick={viewContactDetails} src={pp} className="thumbnail" />;

    if (contact.photoURL) {
      image = <img onClick={viewContactDetails} src={contact.photoURL} className="thumbnail" />;
    }

    return (
      <header className="chat-header">
        <SidebarTrigger clicked={toggleSidebar} />
        { image }
        { contact ? <h3>{contact.fullName}</h3> : null }

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
  }
  return (
    <header className="chat-header">
      <SidebarTrigger clicked={toggleSidebar} />
    </header>
  );
};

const mapDispatchToProps = dispatch => ({
  viewContactDetails: () => dispatch({ type: actions.VIEW_CONTACT_DETAILS, view: true }),
  toggleSidebar: () => dispatch({ type: actions.SET_SIDEBAR_VISIBLE }),
});

export default connect(null, mapDispatchToProps)(header);
