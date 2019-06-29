import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import About from "./pages/About";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="cover-container d-flex h-100 p-3 flex-column">
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/trade" component={Trade} />
      </div>
    </Router>
  );
}

export default App;
