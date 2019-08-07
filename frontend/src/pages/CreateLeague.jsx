import React from "react";
import Header from "../components/Header";

import "./CreateLeague.css";

class CreateLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueName: "",
      championship: "ligue1",
      isPrivate: "1"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert("Votre parfum favori est : " + this.state.league);
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container-page">
          <div className="d-flex container-part row back-green justify-content-center">
            <h1>CREER UNE LIGUE</h1>
          </div>
          <div className="d-flex row">
            <div className="col-50">
              <img
                className="stadium"
                src={require("../stadium_art.jpg")}
                alt="stadium"
              />
            </div>
            <div className="container-test col-50">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="leagueName" className="label">
                      Nom de la ligue
                    </label>
                  </div>
                  <div className="col-75">
                    <input
                      type="text"
                      id="leagueName"
                      name="leagueName"
                      // placeholder="Nom de ta ligue"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="championship" className="label">
                      Quel championnat ?
                    </label>
                  </div>
                  <div className="col-75 league-select">
                    <select
                      id="championship"
                      name="championship"
                      value={this.state.league}
                      onChange={this.handleChange}
                    >
                      <option value="ligue1">France - Ligue 1</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-25">
                    <label htmlFor="privacy" className="label">
                      Privée/Publique
                    </label>
                  </div>
                  <div className="col-75">
                    <label>
                      <input
                        type="radio"
                        name="isPrivate"
                        value="1"
                        checked={this.state.isPrivate === "1"}
                        onChange={this.handleChange}
                      />
                      <div className="front-end box">
                        <span className="privacy px-3">PRIVEE</span>
                      </div>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isPrivate"
                        value="0"
                        checked={this.state.isPrivate === "0"}
                        onChange={this.handleChange}
                      />
                      <div className="back-end box">
                        <span className="privacy px-3">PUBLIQUE</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <input className="col-12"type="submit" value="VALIDER" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateLeague;
