import React from "react";

// import Dropdown from "../../UI/Dropdown/Dropdown";

import pp from "../../../assets/pp.png";

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import "./Header.scss";

const header = props => {
  let image = <img onClick={props.viewContactDetails} src={pp} className="thumbnail" />;

  if (props.contact.photoURL) {
    image = <img onClick={props.viewContactDetails} src={props.contact.photoURL} className="thumbnail" />;
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

const mapDispatchToProps = dispatch => {
  return {
    viewContactDetails: () => dispatch({ type: actions.VIEW_CONTACT_DETAILS, view: true })
  }
}

export default connect(null, mapDispatchToProps)(header);
