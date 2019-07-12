import React from "react";
import axios from "axios";
import Header from "../components/Header";
import cogoToast from "cogo-toast";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpEmail: "",
      signUpEmailError: false,
      signUpPassword: "",
      signUpPasswordError: false,
      signInEmail: "",
      signInPassword: "",
      signInError: ""
    };
  }

  signUp = event => {
    event.preventDefault();

    const errors = {};

    errors.signUpEmailError = !/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(
      this.state.signUpEmail
    );
    errors.signUpPasswordError = this.state.signUpPassword.length <= 7;
    this.setState(errors);
    console.log();
    if (!errors.signUpEmailError && !errors.signUpPasswordError) {
      axios
        .post(
          "http://localhost:5000/api/signup",
          {
            email: this.state.signUpEmail,
            password: this.state.signUpPassword
          },
          { headers: { Accept: "application/json" } }
        )
        .then(res => {
          if (res.data.code === 201) {
            cogoToast.success("Inscription réussie", { position: "top-right" });
          }
        })
        .catch(error => {
          cogoToast.error("L'inscription a échoué", { position: "top-right" });
        });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container my-3 cover">
          <div className="inner cover">
            <div className="row header-home pl-2 pr-3 mb-3">
              <h1 className="cover-heading">Home</h1>
            </div>
            <h3>Compose ton équipe</h3>
            <p className="lead">
              Tu disposes d'un budget de 500 Millions pour composer ton équipe
              parmi les joueurs de Ligue 1.
            </p>
            <h3>Crée et rejoins une ligue</h3>
            <p className="lead">
              Affronte amis, famille, collègues ou la communauté de joueurs dans
              des ligues privées.
            </p>
            <div className="row">
              <div className="login-form px-3 my-3 col-6">
                <h3>Se connecter</h3>
                <form onSubmit={this.login}>
                  <input
                    type="email"
                    name="signInEmail"
                    placeholder="Email"
                    id="inputEmailSignIn"
                    ref={ref => (this.inputEmailSignIn = ref)}
                    onChange={this.handleChange}
                    value={this.state.signInEmail}
                    required
                  />
                  <input
                    type="password"
                    name="signInPassword"
                    placeholder="Mot de passe"
                    id="inputPasswordSignIn"
                    ref={ref => (this.inputSignInPassword = ref)}
                    onChange={this.handleChange}
                    value={this.state.signInPassword}
                    required
                  />
                  <input type="submit" />
                </form>
              </div>
              <div className="register-form px-3 my-3 col-6">
                <h3>S'inscrire</h3>
                <form onSubmit={this.signUp}>
                  <input
                    type="email"
                    name="signUpEmail"
                    placeholder="Email"
                    id="inputEmail"
                    ref={ref => (this.inputEmail = ref)}
                    onChange={this.handleChange}
                    value={this.state.signUpEmail}
                    required
                  />
                  {this.state.signUpEmailError && (
                    <div className="error">
                      Votre adresse email est invalide.
                    </div>
                  )}
                  <input
                    type="password"
                    name="signUpPassword"
                    placeholder="Mot de passe"
                    id="inputPassword"
                    ref={ref => (this.inputPassword = ref)}
                    onChange={this.handleChange}
                    value={this.state.signUpPassword}
                    required
                  />
                  {this.state.signUpPasswordError && (
                    <div className="error">Au moins 8 caractères.</div>
                  )}
                  <input type="submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
