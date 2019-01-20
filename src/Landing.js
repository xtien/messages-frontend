import React, { Component } from "react";
import "./css/bootstrap.css";

class Landing extends Component {
  // https://medium.com/@thejasonfile/basic-intro-to-react-router-v4-a08ae1ba5c42

  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="container text-black-50">
        <div className="text shadow p-3 mb-5 bg-white rounded landing">
          <p>
            This is an example React application I have built to get to know
            React.
          </p>
          <p>
            It displays a list of messages. These messages are made available to
            external applications via an API. In the Messages screen, you can
            list, add, delete and update notifications. I built this as a demo
            for a client. It took me about two days to build the front-end and
            the back-end.
          </p>
          <p>
            This frontend was built with React, a javascript library. The
            backend was built with Java, Spring Boot, JPA and Postgresql.
            Postgresql can easily be replaced by another database.{" "}
          </p>
          <p>
            You can find the source code of this front-end{" "}
            <a href="http://www.github.com/xtien/messages-frontend">here</a> on
            github, the source of the back-end is{" "}
            <a href="http://www.github.com/xtien/messages-backend">here</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Landing;
