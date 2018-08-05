import React from "react";

import "./Input.scss";

const input = () => (
  <div className="chat-input">
    <i className="fa fa-smile" />
    <input placeholder="Type a message..." />
    <i className="fa fa-microphone" />
  </div>
);

export default input;
