import React from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";

import SidebarTrigger from '../../utilities/SidebarTrigger/SidebarTrigger';

import * as actions from '../../store/actions';

import Modal from '../../utilities/Modal/Modal';
import ContactDetails from '../../components/ContactDetails/ContactDetails';

import { connect } from 'react-redux'

import './Layout.scss';

const layout = props => (
  <div className="container">
    <Modal onClose={props.hideContactDetails} show={props.viewContactDetails} >
      <ContactDetails contact={props.selectedContact} />
    </Modal>

    <SidebarTrigger clicked={props.toggleSidebar} />
    <Sidebar visible={props.sidebarVisible} />
    { props.selectedContact ? <Chat sidebarVisible={props.sidebarVisible} /> : <div className="no-contact"> Select a Contact to get started! </div> }
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