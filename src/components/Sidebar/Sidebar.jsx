import React from "react";

import Header from "./Header/Header";
import Contact from "./Contact/Contact";
import Search from "./Search/Search";

import Loader from '@/utilities/Loader/Loader';

import "./Sidebar.scss";

const sidebar = props =>  (
  <div className={"sidebar " + (props.visible ? "visible" : null)}>
    <Header onLogout={props.onLogout} user={props.user} />
    <Search changed={props.filterHandler} />

    <div className="contact-list">
      <Loader show={props.loading} transition={true} overlay={true} />
      {props.contacts.map(contact => <Contact clicked={() => props.onContactSelected(contact)} key={contact.uid} name={contact.fullName} />)}
    </div>
  </div>
);

export default sidebar;
