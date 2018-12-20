import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// this will have state, so we are using a class
class Navbar extends Component {
  state = {
    toggleShow: true
  };

  handleToggle = () => this.setState({ toggleShow: !this.state.toggleShow });

  render() {
    const { auth, authenticated } = this.props;

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
              this.state.toggleShow ? "navbar--listView" : "navbar--mainView"
            }
          >
            <li>
              <Link to="/" className="navbar__navlink">
                FIND
              </Link>
            </li>

            <li>
              <Link to="/trailmarks" className="navbar__navlink">
                TRAILMARKS
              </Link>
            </li>

            <li>
              <a href="#!" className="navbar__navlink">
                {/* {auth.email} */} USERNAME
              </a>
            </li>

            <li>
              <Link to="/logout" className="navbar__navlink">
                LOGOUT
              </Link>
            </li>
          </ul>
        ) : null
        //{
        /* <ul
            className={
              this.state.toggleShow ? "navbar--listView" : "navbar--mainView"
            }
            id="jsMenu"
          >
            <li>
              <Link to="/login" className="navbar__navlink">
                LOGIN
              </Link>
            </li>
          </ul> */
        //}
        }
      </nav>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

// export default compose(
//   firebaseConnect(),
//   connect((state, props) => ({
//     auth: state.firebase.auth
//   }))
// )(Navbar);

export default Navbar;
