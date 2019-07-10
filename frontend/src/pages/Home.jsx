import React from "react";
import axios from "axios";

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

    if (!errors.signUpEmailError && !errors.signUpPasswordError) {
      axios
        .post(
          "http://localhost:5050/api/signup",
          {
            email: this.state.signUpEmail,
            password: this.state.signUpPassword
          },
          { headers: { Accept: "application/json" } }
        )
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
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
      <div className="container my-3 cover">
        <div className="inner cover">
          <div className="row header-home pl-2 pr-3 mb-3">
            <h1 className="cover-heading">Home</h1>
          </div>
          <h3>Compose ton équipe</h3>
          <p className="lead">
             Tu disposes d'un budget de 500 Millions pour composer ton équipe parmi les joueurs de Ligue 1.
          </p>
          <h3>Créé et rejoins une ligue</h3>
          <p className="lead">
            Affronte amis, famille, collègues ou la communauté de joueurs dans des ligues privées.
          </p>
          <div className="row">
            <div className="login-form px-3 my-3 col-6">
              <h3>Se connecter</h3>
              <form onSubmit={this.login}>
                <input
                  type="email"
                  name="emailSignIn"
                  placeholder="Email"
                  id="inputEmailSignIn"
                  ref={ref => (this.inputEmailSignIn = ref)}
                  onChange={this.handleChange}
                  value={this.state.signInEmail}
                  required
                />
                <input
                  type="password"
                  name="passwordSignIn"
                  placeholder="Mot de passe"
                  id="inputPasswordSignIn"
                  ref={ref => (this.inputPassword = ref)}
                  onChange={this.handleChange}
                  value={this.state.signInPassword}
                  required
                />
                <input type="submit" />
              </form>
            </div>
            <div className="register-form px-3 my-3 col-6">
              <h3>S'inscrire</h3>
              <form onSubmit={this.login}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="inputEmail"
                  ref={ref => (this.inputEmail = ref)}
                  onChange={this.handleChange}
                  value={this.state.signUpEmail}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  id="inputPassword"
                  ref={ref => (this.inputPassword = ref)}
                  onChange={this.handleChange}
                  value={this.state.signUpPassword}
                  required
                />
                <input type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
