import React from "react";
import Header from "../components/Header";

class Dashboard extends React.Component {
  goTo(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container-page row">
          <div className="col-6">
            <div className="container-part back-indigo pointer">
              CREER UN CLUB
            </div>
            <div
              className="container-part back-green pointer"
              onClick={this.goTo.bind(this, "./createLeague")}
            >
              CREER UNE LIGUE
            </div>
            <div
              className="container-part back-blue pointer"
              onClick={this.goTo.bind(this, "./joinLeague")}
            >
              REJOINDRE UNE LIGUE
            </div>
          </div>
          <div className="col-6">
              <img
                className="stadium"
                src={require("../stadium_art.jpg")}
                alt="stadium"
              />
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
