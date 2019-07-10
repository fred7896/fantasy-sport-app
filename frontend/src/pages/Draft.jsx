import React from "react";
import Trade3 from "../components/Trade3";
import Header from "../components/Header";

class Draft extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container my-3 cover">
          <Trade3 />
        </div>
      </React.Fragment>
    );
  }
}

export default Draft;
