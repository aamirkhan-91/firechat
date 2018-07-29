import React from 'react';

import pp from '../../../assets/pp.jpg';

import './Header.scss';

const header = () => (
    <header className="chat-header">
        <img className='thumbnail' src={pp} />

        <div>
            <i className="fa fa-search" />
            <i className="fa fa-paperclip" />
            <i className="fa fa-ellipsis-h" />
        </div>
    </header>
);

export default header;