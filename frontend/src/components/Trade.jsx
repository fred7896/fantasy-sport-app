import React from "react";

let dataFile = require("../playerData.json");

export default class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: dataFile.data,
      sortedPlayers: dataFile.data,
      cart :[],
      budget: 500
    };
  }

  compareCost = (a, b) => {
    if (Number(a.initCost) < Number(b.initCost)) {
      return 1;
    }
    if (Number(a.initCost) > Number(b.initCost)) {
      return -1;
    }
    return 0;
  };

  buyPlayer = (id, price) => {
      console.log(id);
      if(this.state.budget - price >=0  && !this.state.cart.includes(id)){
        this.setState({
          cart : [...this.state.cart, id],
          budget : this.state.budget - price
        });
      }

    }

  render() {
    let tableToMap = this.state.sortedPlayers;
    console.log(this.state.cart);
    this.state.sortedPlayers = this.state.players.sort(this.compareCost);
    
    return (
      <div className="row">
        <div className="col-9">
          <table className="table table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th>Nom du joueur</th>
                <th>Poste</th>
                <th>Equipe</th>
                <th>Cote</th>
              </tr>
            </thead>
            <tbody>
              {tableToMap.map(player => {
                return (
                  <tr key={player.id} onClick={() => this.buyPlayer(player.id, player.initCost)}>
                    <td>{player.namePlayer}</td>
                    <td>{player.role}</td>
                    <td>{player.realTeam}</td>
                    <td>{player.initCost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col-3">
          <div className="card mb-2">
            <div className="card-body">
              {`Budget Restant : ${this.state.budget}M`}
            </div>
          </div>
          <table className="table table-hover table-sm">
          <thead className="thead-dark">
              <tr>
                <th colSpan="3">Gardiens</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sortedPlayers.filter(player => {
                return player.role === 'Gardien' && this.state.cart.includes(player.id);
              }).map((player, idx) => (
                <tr key={idx}><td>{player.namePlayer}</td><td>{player.initCost}</td><td>35</td></tr>
              ))
              }
 
            </tbody>
          </table>
          <table className="table table-hover table-sm">
          <thead className="thead-dark">
              <tr>
                <th colSpan="3">Defenseurs</th>
              </tr>
            </thead>
            <tbody className='fixed_header'>
            {this.state.sortedPlayers.filter(player => {
                return player.role.slice(0,3) === 'Def' && this.state.cart.includes(player.id);
              }).map((player, idx) => (
                <tr key={idx}><td>{player.namePlayer}</td><td>{player.initCost}</td><td>35</td></tr>
              ))
              } 
            </tbody>
          </table>
          <table className="table table-hover table-sm">
          <thead className="thead-dark">
              <tr>
                <th colSpan="3">Milieux</th>
              </tr>
            </thead>
            <tbody>
            {this.state.sortedPlayers.filter(player => {
                return player.role.slice(0 ,3) === 'Mil' && this.state.cart.includes(player.id);
              }).map((player, idx) => (
                <tr key={idx}><td>{player.namePlayer}</td><td>{player.initCost}</td><td>35</td></tr>
              ))
              
            }
            </tbody>
          </table>
          <table className="table table-hover table-sm">
          <thead className="thead-dark fixed_header">
              <tr>
                <th colSpan="3">Attaquants</th>
              </tr>
            </thead>
            <tbody>       
            {this.state.sortedPlayers.filter(player => {
                return player.role === 'Attaquant' && this.state.cart.includes(player.id);
              }).map((player, idx) => (
                <tr key={idx}><td>{player.namePlayer}</td><td>{player.initCost}</td><td>35</td></tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
