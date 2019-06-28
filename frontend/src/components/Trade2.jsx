import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";

let dataFile = require("../playerData.json");

//fonction de tri
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  return 1;
}

// compareCost = (a, b) => {
//   if (Number(a.initCost) < Number(b.initCost)) {
//     return 1;
//   }
//   if (Number(a.initCost) > Number(b.initCost)) {
//     return -1;
//   }
//   return 0;
// };

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const rows = [
  {
    id: "namePlayer",
    numeric: false,
    disablePadding: false,
    label: "Nom du joueur"
  },
  { id: "role", numeric: false, disablePadding: false, label: "Poste" },
  { id: "realTeam", numeric: false, disablePadding: false, label: "Equipe" },
  { id: "initCost", numeric: true, disablePadding: false, label: "Cote" }
];

// TableHeader with sort option

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Trier"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

class Trade2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: dataFile.data,
      order: "asc",
      orderBy: "namePlayer",
      sortedPlayers: dataFile.data,
      cart: [],
      budget: 500
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  buyPlayer = (id, price) => {
    console.log(id);
    if (this.state.budget - price >= 0 && !this.state.cart.includes(id)) {
      this.setState({
        cart: [...this.state.cart, id],
        budget: this.state.budget - price
      });
    }
  };

  render() {
    //let tableToMap = this.state.sortedPlayers;
    //this.state.sortedPlayers = this.state.players.sort(this.compareCost);
    const { classes } = this.props;
    const { players, order, orderBy } = this.state;

    return (
      <div className="row">
        <div className="col-9">
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {stableSort(players, getSorting(order, orderBy)).map(player => {
                return (
                  <TableRow
                    hover
                    key={player.id}
                    className={classes.row}
                    tabIndex={-1}
                    onClick={() => this.buyPlayer(player.id, player.initCost)}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      {player.namePlayer}
                    </TableCell>
                    <TableCell>{player.role}</TableCell>
                    <TableCell>{player.realTeam}</TableCell>
                    <TableCell align="right">{player.initCost}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="col-3">
          <div className="card mb-2">
            <div className="card-body">
              {`Budget Restant : ${this.state.budget}M`}
            </div>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Gardiens</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players
                .filter(player => {
                  return (
                    player.role === "Gardien" &&
                    this.state.cart.includes(player.id)
                  );
                })
                .map((player, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{player.namePlayer}</TableCell>
                    <TableCell>{player.initCost}</TableCell>
                    <TableCell>35</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Defenseurs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players
                .filter(player => {
                  return (
                    player.role.slice(0, 3) === "Def" &&
                    this.state.cart.includes(player.id)
                  );
                })
                .map((player, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{player.namePlayer}</TableCell>
                    <TableCell>{player.initCost}</TableCell>
                    <TableCell>35</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Milieux</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players
                .filter(player => {
                  return (
                    player.role.slice(0, 3) === "Mil" &&
                    this.state.cart.includes(player.id)
                  );
                })
                .map((player, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{player.namePlayer}</TableCell>
                    <TableCell>{player.initCost}</TableCell>
                    <TableCell>35</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Attaquants</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.players
                .filter(player => {
                  return (
                    player.role === "Attaquant" &&
                    this.state.cart.includes(player.id)
                  );
                })
                .map((player, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{player.namePlayer}</TableCell>
                    <TableCell>{player.initCost}</TableCell>
                    <TableCell>35</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

Trade2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Trade2);
