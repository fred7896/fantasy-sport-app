import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Draft from "./pages/Draft";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="cover-container d-flex h-100 p-3 flex-column">
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/draft" component={Draft} />
      </div>
    </Router>
  );
}

export default App;
