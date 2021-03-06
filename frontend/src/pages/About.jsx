import React from "react";
import Header from "../components/Header";

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container-page">
          <div className="row header-about pl-2 pr-3 mb-3">
            <h1 className="cover-heading">A propos</h1>
          </div>
          <p className="lead">
            Cover is a one-page template for building simple and beautiful home
            pages. Download, edit the text, and add your own fullscreen
            background photo to make it your own.
          </p>
          <p className="lead">Learn more</p>
        </div>
      </React.Fragment>
    );
  }
}

export default About;
