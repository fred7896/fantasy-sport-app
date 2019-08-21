import React from "react";
import Header from "../components/Header";
import axios from "axios";
import swal from "sweetalert";

import "./CreateLeague.css";

class CreateLeague extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueName: "",
      championship: "ligue1",
      isPrivate: "1",
      joinCode:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setJoinCode(7);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = localStorage.getItem("id");
    axios
      .post(
        "http://localhost:5000/api/newLeague",
        {
          name: this.state.leagueName,
          championship: this.state.championship,
          privacy: this.state.isPrivate,
          join_code : this.state.joinCode,
          created_by: id
        },
        {
          headers: {
            Accept: "application/json",
            // Authorization: `Bearer ${token}`
          }
        }
      ).then(() => {
        swal(
          "Ligue créée",
          `Partagez le code ${this.state.joinCode}`,
          "success"
        );
      })
      .catch(error => {
        swal("Erreur", "Votre ligue n'a pas pu être créée", "error");
      });
  }

  setJoinCode(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.setState({
      joinCode : result
    });
 }
 


  render() {
    console.log(this.state.joinCode);
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
                      value={this.state.leagueName}
                      onChange={this.handleChange}
                      placeholder="Nom de ta ligue"
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
                      value={this.state.championship}
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
