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
        <div className="container-page">
            <div className="container-part back-indigo pointer" >CREER UN CLUB</div>
            <div className="container-part back-green pointer" onClick={this.goTo.bind(this, './createLeague')}>CREER UNE LIGUE</div>
            <div className="container-part back-blue">REJOINDRE UNE LIGUE</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
