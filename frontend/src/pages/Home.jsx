import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

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
          <p className="lead">
            Pick Your Squad. Use your budget of 500m to pick a squad from the
            French League.
          </p>
          <p className="lead">
            Create and Join Leagues. Play against friends and family, colleagues
            or a web community in private leagues.
          </p>
          <div className="row">
            <div className="login-form px-3 my-3">
              <h3>Signin</h3>
              <form onSubmit={this.login}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="inputUsernameSignIn"
                  ref={ref => (this.inputUsername = ref)}
                  onChange={this.handleChange}
                  value={this.state.username}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="inputPasswordSignIn"
                  ref={ref => (this.inputPassword = ref)}
                  onChange={this.handleChange}
                  value={this.state.password}
                  required
                />
                <input type="submit" />
              </form>
            </div>
            <div className="register-form px-3 my-3">
              <h3>Login</h3>
              <form onSubmit={this.login}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="inputUsername"
                  ref={ref => (this.inputUsername = ref)}
                  onChange={this.handleChange}
                  value={this.state.username}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="inputPassword"
                  ref={ref => (this.inputPassword = ref)}
                  onChange={this.handleChange}
                  value={this.state.password}
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
