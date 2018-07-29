import React from 'react';

import Header from './Header/Header';
import Input from './Input/Input';

import './Chat.scss';

const chat = () => (
    <div className='chat'>
        <Header/>
        <div className='test'></div>
        <Input />
    </div>
);

export default chat;