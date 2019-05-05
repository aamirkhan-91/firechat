import React from 'react';

import './Input.scss';

const input = (props) => {
  const textInput = React.createRef();

  function handleClick() {
    if (textInput.current.value) {
      props.send(textInput.current.value);
      textInput.current.value = '';
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div className="chat-input">
      <input onKeyUp={handleKeyPress} ref={textInput} placeholder="Type a message..." />
      <div onClick={handleClick} className="icon">
        <i className="fa fa-play" />
      </div>
    </div>
  );
};

export default input;
