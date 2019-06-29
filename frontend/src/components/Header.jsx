import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="masthead">
        <div className="inner">
        <img className="logo" src={require("../logo.png")} alt="logo"/>
        <h3 className="masthead-brand mr-2">FANTASY F<span>OO</span>TBALL</h3>
          <ul className="nav nav-masthead justify-content-center navbar-static-top">
            <li className="nav-link active">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-link">
              <Link to="/draft">Draft</Link>
            </li>
          </ul>
        </div>
        </header>
    );
  }
}

export default Header;
