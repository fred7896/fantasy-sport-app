import React from "react";
import Header from "../components/Header";

class CreateLeague extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container-page p-0 m-0">
          <div className="inner cover">
          <div className="d-flex container-part row back-green justify-content-center">
            <h1>CREER UNE LIGUE</h1>
            </div>  
            <div className="league-form-wrapper">
              <form>
                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-3 col-form-label">
                    Nom de la ligue
                  </label>
                  <div className="col-9">
                    <input
                      className="form-control"
                      type="text"
                      value="Ligue test"
                      id="example-text-input"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="exampleSelect1" className="col-3 col-form-label">
                    Quel championnat ?
                  </label>
                  <div className="col-9">
                    <select className="form-control" id="exampleSelect1">
                      <option>France - Ligue 1</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-3 col-form-label">
                    Privée/Publique
                  </label>
                  <div className="col-9 privacy">
                    <label>
                      <input type="radio" name="radio" checked />
                      <div className="front-end box">
                        <span className="privacy px-3">PRIVEE</span>
                      </div>
                    </label>
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span className="privacy px-3">PUBLIQUE</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="example-number-input"
                    className="col-2 col-form-label"
                  >
                    Number
                  </label>
                  <div className="col-10">
                    <input
                      className="form-control"
                      type="number"
                      value="42"
                      id="example-number-input"
                    />
                  </div>
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
