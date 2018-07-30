import React from 'react';

import Dropdown from '../../Dropdown/Dropdown';

import pp from '../../../assets/pp.jpg';

import './Header.scss';

const header = () => (
  <header className="chat-header">
    <img className="thumbnail" src={pp} />

    <div>
      <i className="fa fa-search" />
      <i className="fa fa-paperclip" />
      <Dropdown iconName="fa-ellipsis-v">
        <span>Contact Info</span>
        <span>Clear Messages</span>
        <span>Delete Chat</span>
      </Dropdown>
    </div>
  </header>
);

export default header;