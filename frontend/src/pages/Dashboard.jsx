import React from "react";
import Header from "../components/Header";

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container my-3 cover">
          <div className="inner cover">
            <div className="row header-about pl-2 pr-3 mb-3">
              <h1 className="cover-heading">Dashboard</h1>
            </div>
              <div>Créer une ligue</div>
              <div>Rejoindre une ligue</div>
            <p className="lead">Learn more</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;