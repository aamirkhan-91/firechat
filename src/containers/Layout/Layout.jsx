import React from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";

import * as actions from '../../store/actions';

import Modal from '../../utilities/Modal/Modal';
import ContactDetails from '../../components/ContactDetails/ContactDetails';

import { connect } from 'react-redux'

import './Layout.scss';
import SidebarTrigger from "../../utilities/SidebarTrigger/SidebarTrigger";

const layout = props => (
  <div className="container">
    <Modal onClose={props.hideContactDetails} show={props.viewContactDetails} >
      <ContactDetails contact={props.selectedContact} />
    </Modal>

    <Sidebar visible={props.sidebarVisible} />
    { props.selectedContact ? <Chat /> :
      <div className="no-contact">
        <div>
          <SidebarTrigger clicked={props.toggleSidebar} />
        </div>
        <h3>Select a Contact to get started!</h3>
      </div>
    }
  </div>
);

const mapStateToProps = state => {
  return {
    selectedContact: state.contacts.selectedContact,
    viewContactDetails: state.ui.viewContactDetails,
    sidebarVisible: state.ui.sidebarVisible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch({ type: actions.SET_USER, user: user }),
    hideContactDetails: () => dispatch({ type: actions.VIEW_CONTACT_DETAILS, view: false }),
    toggleSidebar: () => dispatch({ type: actions.SET_SIDEBAR_VISIBLE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(layout);