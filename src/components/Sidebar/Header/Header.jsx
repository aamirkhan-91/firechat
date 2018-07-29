import React from 'react';

import pp from '../../../assets/pp.jpg';

import './Header.scss';

const sidebarHeader = () => (
  <header className="sidebar-header">
    <img className='thumbnail' src={pp} />

    <div>
      <i className="fa fa-envelope" />
      <i className="fa fa-ellipsis-h" />
    </div>
  </header>
);

export default sidebarHeader;