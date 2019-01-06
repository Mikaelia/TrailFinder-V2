import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "./Spinner";
import { app } from "../base";

class Logout extends Component {
  state = {
    redirect: false
  };

  componentWillMount = () => {
    app
      .auth()
      .signOut()
      .then(user => {
        this.setState({ redirect: true });
      });
  };

  render() {
    return this.state.redirect ? <Redirect to="/login" /> : <Spinner />;
  }
}

export default Logout;
