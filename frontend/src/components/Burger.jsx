import React from "react";
import { stack as Menu } from "react-burger-menu";

class Burger extends React.Component {
  render() {
    return (
      <Menu>
        <h3 className="header-brand noFocus">
          F<span>4</span>F
        </h3>

        <a id="home" className="menu-item noFocus" href="/">
          Home
        </a>
        <a id="dashboard" className="menu-item noFocus" href="/dashboard">
          Dashboard
        </a>
        <a id="createLeague" className="menu-item noFocus" href="/createLeague">
          Create League
        </a>
        <a id="draft" className="menu-item noFocus" href="/draft">
          Draft
        </a>
        <a id="about" className="menu-item noFocus" href="/about">
          About
        </a>
      </Menu>
    );
  }
}

export default Burger;
