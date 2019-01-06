import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { app } from "./base";

import AppNavbar from "./components/Navbar";
import Loader from "./components/Spinner";
import WelcomePage from "./components/pages/WelcomePage.js";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import FindTrailPage from "./components/pages/FindTrailPage/FindTrailPage";
import TrailDetails from "./components/TrailDetails";
import Trailmarks from "./components/Trailmarks";

import "./css/style.css";

class App extends Component {
  state = {
    authenticated: false,
    loading: true,
    user: null
  };

  componentWillMount = () => {
    //store here because we'll need to remove
    this.removeAuthListener = app.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
          user
        });
      } else {
        this.setState({ authenticated: false, loading: false });
      }
    });
  };

  componentWillUnmount = () => {
    this.removeAuthListener();
  };

  render() {
    console.log(app.auth);
    return this.state.loading ? (
      <Loader />
    ) : (
      <Router>
        <div className="App">
          <AppNavbar
            authenticated={this.state.authenticated}
            user={this.state.user}
          />
          <Switch>
            <Route exact path="/trailmarks" component={Trailmarks} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/" component={WelcomePage} />
            <Route exact path="/mapview" component={FindTrailPage} />
            <Route path="/trail/:id" component={TrailDetails} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
