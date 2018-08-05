import React, { Component } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    );
  }
}
