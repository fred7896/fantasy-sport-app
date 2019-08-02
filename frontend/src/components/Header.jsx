import React from "react";
import Burger from '../components/Burger';

class Header extends React.Component {
  render() {
    return (
      <header className="row">
      <Burger />    
      </header>
    );
  }
}

export default Header;
