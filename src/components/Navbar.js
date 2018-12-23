import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// this will have state, so we are using a class
class Navbar extends Component {
  state = {
    toggleShow: false
  };

  handleToggle = () => this.setState({ toggleShow: !this.state.toggleShow });

  render() {
    const { authenticated } = this.props;
    const { toggleShow } = this.state;

    return (
      <nav className="navbar">
        <span className="navbar__toggle">
          <i className="fas fa-bars" onClick={this.handleToggle} />
        </span>
        <div className="navbar__logo">
          <div className="navbar__logo-icon">
            <i className="far fa-compass fa-2x" />
          </div>
          <Link to="/" className="navbar__logo-text">
            <span style={{ fontWeight: 600 }}>TRAIL</span>
            FINDER
          </Link>
        </div>

        {authenticated ? (
          <ul
            className={
              toggleShow
                ? "navlist navlist--listView"
                : "navlist navlist--rowView"
            }
          >
            <li onClick={this.handleToggle}>
              <Link to="/" className="navlist__navlink">
                FIND
              </Link>
            </li>

            <li onClick={this.handleToggle}>
              <Link to="/trailmarks" className="navlist__navlink">
                TRAILMARKS
              </Link>
            </li>

            <li onClick={this.handleToggle}>
              <a href="#!" className="navlist__navlink">
                {/* {auth.email} */} USERNAME
              </a>
            </li>

            <li onClick={this.handleToggle}>
              <Link to="/logout" className="navlist__navlink">
                LOGOUT
              </Link>
            </li>
          </ul>
        ) : (
          <ul
            className={
              this.state.toggleShow ? "navlist--listView" : "navlist--rowView"
            }
          >
            <li onClick={this.handleToggle}>
              <Link to="/login" className="navlist__navlink">
                LOGIN
              </Link>
            </li>
            <li onClick={this.handleToggle}>
              <Link to="/" className="navlist__navlink">
                HOME
              </Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default Navbar;
