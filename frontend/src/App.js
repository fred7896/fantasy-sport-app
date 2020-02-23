import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import Dashboard from "./pages/Dashboard";
import Draft from "./pages/Draft";
import About from "./pages/About";
import CreateLeague from "./pages/CreateLeague";
import JoinLeague from "./pages/JoinLeague";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { createBrowserHistory } from "history";
import "./App.css";

class App extends React.Component {
  render() {
    const history = createBrowserHistory();
    return (
      <Router history={history}>
        <Route exact path="/" component={Login} />
        <Route
          path="/dashboard"
          component={Dashboard}
          authed={this.props.user.isLoggedIn}
        />
        <Route
          path="/about"
          component={About}
          authed={this.props.user.isLoggedIn}
        />
        <Route
          path="/draft"
          component={Draft}
          authed={this.props.user.isLoggedIn}
        />
        <Route
          path="/createLeague"
          component={CreateLeague}
          authed={this.props.user.isLoggedIn}
        />
        <Route
          path="/joinLeague"
          component={JoinLeague}
          authed={this.props.user.isLoggedIn}
        />
        <Route
          path="/login"
          component={Login}
          authed={this.props.user.isLoggedIn}
        />
        <Route
          path="/register"
          component={Register}
          authed={this.props.user.isLoggedIn}
        />
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
