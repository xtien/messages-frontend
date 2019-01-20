import React, { Component } from "react";
import axios from "axios";
import "./css/bootstrap.css";
import { Redirect } from "react-router-dom";
import EditMessageForm from "./EditMessageForm";

class AddMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      header: "",
      status: 0,
      text: "",
      resultCode: 0
    };
  }

  render() {
    return (
      <div>
        {
          <EditMessageForm
            action="add"
            text={this.state.text}
            dateFrom={this.state.dateFrom}
            dateUntil={this.state.dateUntil}
            header={this.state.header}
            status={this.state.status}
            id={this.state.id}
          />
        }
      </div>
    );
  }
}

export default AddMessage;
