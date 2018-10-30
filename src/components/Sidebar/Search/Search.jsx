import React from "react";

import "./Search.scss";

import { connect } from 'react-redux'

import * as actions from '../../../store/actions';

const search = props => (
  <div className="contact-search">
    <i className="fa fa-search" />
    <input onChange={props.onSearchChanged} placeholder="Filter Contacts" />
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    onSearchChanged: (search) => dispatch({ type: actions.SET_CONTACT_SEARCH, search: search })
  }
}

export default connect(null, mapDispatchToProps)(search);
