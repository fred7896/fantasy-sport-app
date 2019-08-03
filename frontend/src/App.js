import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Draft from "./pages/Draft";
import About from "./pages/About";
import CreateLeague from "./pages/CreateLeague";
import Snow from "./pages/Snow";

import { createBrowserHistory } from "history";
import "./App.css";

class App extends React.Component {
  render() {
    const history = createBrowserHistory();
    return (
      <Router history={history}>
        <Route exact path="/" component={Home} />
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
          path="/snow"
          component={Snow}
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
