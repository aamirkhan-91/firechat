import React from "react";

import "./Input.scss";

const input = props => {

  let textInput = React.createRef();

  function handleClick() {
    if (textInput.current.value) {
      props.send(textInput.current.value);
      textInput.current.value = '';
    }
  }

  return (
    <div className="chat-input">
      <input ref={textInput} placeholder="Type a message..." />
      <div onClick={handleClick} className="icon">
        <i className="fa fa-play" />
      </div>
    </div>
  );
}

export default input;
