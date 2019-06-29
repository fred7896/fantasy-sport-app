import React from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactModal from "react-modal";

let dataFile = require("../playerData.json");

export default class Trade3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: dataFile.data,
      columns: [
        {
          dataField: "namePlayer",
          text: "Nom du joueur",
          headerAlign: "center",
          headerClasses: "id-custom-cell",
          sort: true
        },
        {
          dataField: "role",
          text: "Poste",
          headerClasses: "id-custom-cell",
          headerAlign: "center",
          sort: true
        },
        {
          dataField: "realTeam",
          text: "Equipe",
          headerClasses: "id-custom-cell",
          headerAlign: "center",
          sort: true
        },
        {
          dataField: "initCost",
          text: "Cote",
          headerClasses: "id-custom-cell",
          headerAlign: "center",
          sort: true,
          sortFunc: (a, b, order) => {
            if (order === "asc") {
              return b - a;
            }
            return a - b; // desc
          }
        }
      ],
      cart: [],
      cartDetail: [],
      budget: 500,
      itemData: 0,
      showModal: false,
      odds: 0
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal = (id, price) => {
    this.setState({
      showModal: true,
      itemData: id,
      odds: price
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  buyPlayer = (id, price, name, cote, role) => {
    console.log(id);
    if (this.state.budget - price >= 0 && !this.state.cart.includes(id)) {
      this.setState({
        cart: [...this.state.cart, id],
        budget: this.state.budget - price,
        cartDetail: [
          ...this.state.cartDetail,
          {
            id: id,
            price: this.state.odds,
            name: name,
            cote: cote,
            role: role
          }
        ],
        showModal: false
      });
    }
  };

  removeCart(id, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
      }
    }
    console.log(arr);
    this.setState({ cartDetail: arr });
  }

  handleChange(event) {
    this.setState({ odds: event.target.value });
  }

  render() {
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.handleOpenModal(row.id, row.initCost);
      }
    };

    const { SearchBar } = Search;
    console.log(this.state.cart);
    console.log(this.state.cartDetail);

    return (
      <React.Fragment>
      <div className="row header-draft pl-2 pr-3 mb-3">
      <h1 className="cover-heading">Draft</h1>
      </div>
      <div className="row">
        <div className="col-9">
        
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Add to Cart Modal"
            className="modal"
            overlayClassName="overlay"
          >
            <div className="modal-body">
              {this.state.players
                .filter(player => {
                  return player.id === this.state.itemData;
                })
                .map((player, idx) => {
                  return (
                    <div className="container-bid-modal" key={idx}>
                      <div className="header-bid-modal">
                        <div className="name-bid-modal">
                          {player.namePlayer.toUpperCase()}
                        </div>
                        <div
                          className="close-modal-button"
                          onClick={this.handleCloseModal}
                        >
                          X
                        </div>
                      </div>
                      <img
                        src={require("../players/psg/NB/Cavani_Edinson_NB.png")}
                        alt={player.name}
                        className="player-portrait"
                      />
                      <div>{player.initCost}</div>
                      <br />
                      <label>
                        Mise
                        <input
                          type="text"
                          required
                          size="3"
                          value={this.state.odds}
                          onChange={this.handleChange.bind(this)}
                        />
                        <br />
                      </label>
                      <button
                        onClick={this.buyPlayer.bind(
                          this,
                          this.state.itemData,
                          this.state.odds,
                          player.namePlayer,
                          player.initCost,
                          player.role
                        )}
                      >
                        Confirmer
                      </button>
                    </div>
                  );
                })}
            </div>
          </ReactModal>
          <ToolkitProvider
            keyField="namePlayer"
            data={this.state.players}
            columns={this.state.columns}
            search
          >
            {props => (
              <div>
                <SearchBar {...props.searchProps} placeholder="Rechercher" />
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  rowEvents={rowEvents}
                  bordered={false}
                  striped
                  hover
                  classes="react-bootstrap-table"
                  tableContainerClass='my-custom-class'
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <div className="col-3">
          <div className="card mb-4">
            <div className="card-body">
              {`Budget Restant : ${this.state.budget}M`}
            </div>
          </div>
          <table className="table table-hover table-sm">
            <thead className="thead-goalkeeper">
              <tr>
                <th colSpan="4">Gardiens</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cartDetail
                .filter(player => {
                  return (
                    player.role === "Gardien"
                    // &&
                    // this.state.cart.includes(player.id)
                  );
                })
                .map((player, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{player.name}</td>
                      <td>{player.cote}</td>
                      <td>{player.price}</td>
                      <td
                        className="remove-player"
                        onClick={this.removeCart.bind(
                          this,
                          player.id,
                          this.state.cartDetail
                        )}
                      >
                        X
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <table className="table table-hover table-sm">
            <thead className="thead-defender">
              <tr>
                <th colSpan="4">Defenseurs</th>
              </tr>
            </thead>
            <tbody className="fixed_header">
              {this.state.cartDetail
                .filter(player => {
                  return (
                    player.role.slice(0, 3) === "Def"
                  );
                })
                .map((player, idx) => (
                  <tr key={idx}>
                    <td>{player.name}</td>
                    <td>{player.cote}</td>
                    <td>{player.price}</td>
                    <td
                        className="remove-player"
                        onClick={this.removeCart.bind(
                          this,
                          player.id,
                          this.state.cartDetail
                        )}
                      >
                        X
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table className="table table-hover table-sm">
            <thead className="thead-midfielder">
              <tr>
                <th colSpan="4">Milieux</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cartDetail
                .filter(player => {
                  return (
                    player.role.slice(0, 3) === "Mil" 
                  );
                })
                .map((player, idx) => (
                  <tr key={idx}>
                    <td>{player.name}</td>
                    <td>{player.cote}</td>
                    <td>{player.price}</td>
                    <td
                        className="remove-player"
                        onClick={this.removeCart.bind(
                          this,
                          player.id,
                          this.state.cartDetail
                        )}
                      >
                        X
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table className="table table-hover table-sm">
            <thead className="thead-forward fixed_header">
              <tr>
                <th colSpan="4">Attaquants</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cartDetail
                .filter(player => {
                  return (
                    player.role === "Attaquant" 
                  );
                })
                .map((player, idx) => (
                  <tr key={idx}>
                    <td>{player.name}</td>
                    <td>{player.cote}</td>
                    <td>{player.price}</td>
                    <td
                        className="remove-player"
                        onClick={this.removeCart.bind(
                          this,
                          player.id,
                          this.state.cartDetail
                        )}
                      >
                        X
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      </React.Fragment>
    );
  }
}
