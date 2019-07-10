const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, connection, saltRounds } = require("./conf");

app.use(cors());
const bodyParser = require("body-parser");
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// TEST
app.get("/", (req, res) => {
  const msg = "Fantasy-sport-app backend";
  console.log(msg);
  res.status(200).send(msg);
});

// REGISTER
app.post("/api/signup", (req, res) => {
  const users = {
    email: req.body.email,
    password: req.body.password
  };

  bcrypt.hash(users.password, parseInt(saltRounds), (err, hash) => {
    users.password = hash;

    connection.query("INSERT INTO account SET ?", users, (err, results) => {
      if (err) {
        console.error("Failure! " + err);
        return res.status(400).send("Invalid User creation request");
      } else {
        console.log("The solution is: ", results);
        res.send({
          code: 201,
          success: "user registered successfully"
        });
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`API root available at http://localhost:${PORT}/`);
});
