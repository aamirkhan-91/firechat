import React from 'react'

import './SidebarTrigger.scss';

const sidebarTrigger = props => {
  return (
    <div onClick={props.clicked} className="sidebar-trigger">
      <i className="fa fa-bars fa-lg"></i>
    </div>
  );
}

export default sidebarTrigger;