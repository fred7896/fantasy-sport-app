import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Header from "./components/Header";
import "./App.css";

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/trade" component={Trade} />
      </div>
    </Router>
  );
}

export default App;
