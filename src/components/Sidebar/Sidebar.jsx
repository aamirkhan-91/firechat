import React from "react";

import Header from "./Header/Header";
import Search from "./Search/Search";
import ContactList from "./ContactList/ContactList";

import { connect } from 'react-redux'

import "./Sidebar.scss";

const sidebar = props =>  {
  let classes = ["sidebar"];

  if (window.innerWidth <= 900) {
    props.visible ? classes.push("visible") : classes.push("");
  }

  return (
    <div className={classes.join(" ")}>
      <Header onLogout={props.onLogout} user={props.current_user} />
      <Search />

      <ContactList />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    current_user: state.user
  }
}

export default connect(mapStateToProps)(sidebar);
