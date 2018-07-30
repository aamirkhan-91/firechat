import React from 'react';

import Dropdown from '../../Dropdown/Dropdown';

import pp from '../../../assets/pp.jpg';

import './Header.scss';

const sidebarHeader = () => (
   <header className="sidebar-header">
    <img className='thumbnail' src={pp} />

    <div>
      {/* <i className="fa fa-envelope" /> */}
      <Dropdown
        iconName='fa-ellipsis-v'>
        <span>Profile</span>
        <span>Settings</span>
        <span>Logout</span>
      </Dropdown>
    </div>
  </header>
);

export default sidebarHeader;