import React from "react";
import Header from "../components/Header";
import axios from "axios";
import swal from "sweetalert";
import "./JoinLeague.scss";

class JoinLeague extends React.Component {
  state = {
    leagueCode: "",
    leagueInfos: []
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    const code = this.state.leagueCode;
    axios.get(`http://localhost:5000/api/league/${code}`).then(res => {
      console.log(res);
      this.setState({
        leagueInfos: [...res.data]
      });
      if (res.data.length > 0) {
        swal(
          `Bienvenue dans la ligue`,
          `${this.state.leagueInfos[0].name} `,
          "success"
        );
      } else {
        swal("Erreur", "Aucune ligue ne correspond à ce code", "error");
      }
    });

    event.preventDefault();
  };
  render() {
    console.log(this.state.leagueCode);
    return (
      <React.Fragment>
        <Header />
        <div className="container-page joinLeague">
          <div className="d-flex container-part row back-blue justify-content-center">
            <h1>REJOINDRE UNE LIGUE</h1>
          </div>
          <div className="row no-gutters">
            <div className="col-sm-12 col-md-12 col-lg-4">
              Rejoignez une ligue (demandez le mot de passe à votre ami qui l’a
              créée){" "}
            </div>
            <form
              className="col-sm-12 col-md-12 col-lg-4 d-flex"
              onSubmit={this.handleSubmit}
            >
              <input
                type="text"
                id="leagueCode"
                name="leagueCode"
                value={this.state.leagueCode}
                onChange={this.handleChange}
                placeholder="Votre code ici"
              />
              <input type="submit" value="VALIDER" />
            </form>
            <div className="col-sm-12 col-md-12 col-lg-4">
              <img
                className="stadium2"
                src={require("../allianz.jpg")}
                alt="stadium"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default JoinLeague;
