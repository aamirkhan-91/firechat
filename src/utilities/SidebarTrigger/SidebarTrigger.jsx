import React from 'react';

import './SidebarTrigger.scss';

const sidebarTrigger = ({ clicked }) => (
  <div onClick={clicked} className="sidebar-trigger">
    <i className="fa fa-bars fa-lg" />
  </div>
);

export default sidebarTrigger;
