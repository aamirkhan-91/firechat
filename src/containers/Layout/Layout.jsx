import React from 'react';

import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import Chat from '../../components/Chat/Chat';

import * as actions from '../../store/actions';

import Modal from '../../utilities/Modal/Modal';
import ContactDetails from '../../components/ContactDetails/ContactDetails';


import './Layout.scss';
import SidebarTrigger from '../../utilities/SidebarTrigger/SidebarTrigger';

const layout = ({
  hideContactDetails, viewContactDetails, sidebarVisible, selectedContact, toggleSidebar,
}) => (
  <div className="container">
    <Modal onClose={hideContactDetails} show={viewContactDetails}>
      <ContactDetails contact={selectedContact} />
    </Modal>

    <Sidebar visible={sidebarVisible} />
    { selectedContact ? <Chat />
      : (
        <div className="no-contact">
          <div>
            <SidebarTrigger clicked={toggleSidebar} />
          </div>
          <h3>Select a Contact to get started!</h3>
        </div>
      )
    }
  </div>
);

const mapStateToProps = state => ({
  selectedContact: state.contacts.selectedContact,
  viewContactDetails: state.ui.viewContactDetails,
  sidebarVisible: state.ui.sidebarVisible,
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({ type: actions.SET_USER, user }),
  hideContactDetails: () => dispatch({ type: actions.VIEW_CONTACT_DETAILS, view: false }),
  toggleSidebar: () => dispatch({ type: actions.SET_SIDEBAR_VISIBLE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(layout);
