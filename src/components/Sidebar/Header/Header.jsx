import React from "react";

import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.png";
import { firebaseAuth } from '../../../config/firebase';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import "./Header.scss";
import SidebarTrigger from "../../../utilities/SidebarTrigger/SidebarTrigger";

const sidebarHeader = props => {

  let image = <img className="thumbnail" src={pp} />;

  if (props.user) {
    if (props.user.photoURL) {
      image = <img className="thumbnail" src={props.user.photoURL} />
    }
  }

  return (
    <header className="sidebar-header">
      <SidebarTrigger clicked={props.toggleSidebar} />
      { image }
      { props.user ? <p>{props.user.displayName}</p> : null }
      <div>
        <Dropdown iconName="fa-ellipsis-v">
          {/* <span>Profile</span>
            <span>Settings</span> */}
          <span onClick={() => firebaseAuth.signOut()} >Logout</span>
        </Dropdown>
      </div>
    </header>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: actions.SET_USER, user: null}),
    toggleSidebar: () => dispatch({ type: actions.SET_SIDEBAR_VISIBLE })
  }
}

export default connect(null, mapDispatchToProps)(sidebarHeader);
