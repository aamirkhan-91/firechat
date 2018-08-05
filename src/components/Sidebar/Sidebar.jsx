import React from "react";

import Header from "./Header/Header";
import Contact from "./Contact/Contact";
import Search from "./Search/Search";

import "./Sidebar.scss";

const sidebar = () => (
  <div className="sidebar">
    <Header />
    <Search />

    <div className="contact-list">
      <Contact name="Bassam Raza" />
      <Contact name="Muneeb Khawaja" />
      <Contact name="Taha Sohail" />
      <Contact name="Azfar Kashif" />
      <Contact name="Bassam Raza" />
      <Contact name="Muneeb Khawaja" />
      <Contact name="Taha Sohail" />
      <Contact name="Azfar Kashif" />
      <Contact name="Bassam Raza" />
      <Contact name="Muneeb Khawaja" />
      <Contact name="Taha Sohail" />
      <Contact name="Azfar Kashif" />
      <Contact name="Bassam Raza" />
      <Contact name="Muneeb Khawaja" />
      <Contact name="Taha Sohail" />
      <Contact name="Azfar Kashif" />
      <Contact name="Bassam Raza" />
      <Contact name="Muneeb Khawaja" />
      <Contact name="Taha Sohail" />
      <Contact name="Azfar Kashif" />
    </div>
  </div>
);

export default sidebar;
