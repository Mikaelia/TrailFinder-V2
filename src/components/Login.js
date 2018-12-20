import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Toaster, Intent } from "@blueprintjs/core";
import { app, facebookProvider } from "../base";

export default class Login extends Component {
  state = {
    redirect: false
  };

  authWithFacebook = () => {
    app
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          this.toaster.show({
            intent: Intent.DANGER,
            message: "Unable to sign in with Facebook"
          });
        } else {
          this.setState({ redirect: true });
        }
      });
  };

  authWithEmailPassword = event => {
    event.preventDefault();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.length === 0) {
          //create user
        } else if (providers.indexOf("password") === -1) {
          //they used facebook
          this.loginForm.reset();
          this.toaster.show({
            intent: Intent.WARNING,
            message: "Try alternative login"
          });
        } else {
          //sign user in
        }
      })
      .catch(error => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message });
      });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login">
        <Toaster
          className="toaster"
          ref={element => {
            this.toaster = element;
          }}
        />
        <h2 className="login__header">LOGIN</h2>A hikin' we go!
        <form
          className="login__form"
          onSubmit={event => this.authWithEmailPassword(event)}
          ref={form => (this.loginForm = form)}
        >
          <label className="input-label">
            E-mail
            <input
              type="email"
              name="email"
              ref={email => (this.emailInput = email)}
              placeholder="Enter your email address"
            />
          </label>
          <label className="input-label">
            Password
            <input
              type="password"
              name="password"
              ref={password => (this.passwordInput = password)}
              placeholder="Password"
            />
          </label>
          <input className="login__login-button" type="submit" value="Log in" />
        </form>
        <button
          className="login__fb-button"
          onClick={() => this.authWithFacebook()}
        >
          Login with Facebook
        </button>
        <div className="login__note">
          <h5>Note</h5>
          <p>
            If you don't have an account already, this form'll get you started!
          </p>
        </div>
      </div>
    );
  }
}
