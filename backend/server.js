const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, db, saltRounds } = require("./conf");
const passport = require("passport");
require("./passport-strategy");

app.use(passport.initialize());
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

    db.query("INSERT INTO account SET ?", users, (err, results) => {
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

//LOGIN
app.post("/api/auth", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Failed auth !",
        user,
        err,
        info
      });
    }
    req.login(user, { session: false }, loginErr => {
      if (loginErr) {
        return res.status(401).json({
          message: "Couldn't log you in!",
          user,
          loginErr
        });
      }
      user.password = undefined;
      const token = jwt.sign(user, jwtSecret);
      return res.status(200).json({ user, token });
    });
  })(req, res);
});

//CREATE LEAGUE
app.post("/api/newLeague", (req, res) => {
  const league = {
    name: req.body.name,
    championship: req.body.championship,
    privacy: req.body.privacy,
    season: 1,
    join_code: req.body.join_code,
    created_by: req.body.created_by
  };

  db.query("INSERT INTO league SET ?", league, (err, results) => {
    if (err) {
      console.error("Failure! " + err);
      return res.status(500).send("requete de création invalide");
    } else {
      console.log("The solution is: ", results);
      res.send({
        code: 201,
        success: "Ligue créée avec succès"
      });
    }
  });
});

//GET LEAGUE BY JOIN CODE
app.get("/api/league/:code", (req, res) => {
  const code = req.params.code;
  db.query(
    "SELECT id, name FROM league WHERE join_code = ?",
    [code],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération de la ligue");
      } else {
        res.json(results);
      }
    }
  );
});

//CREATE LEAGUE PLAYER TO 

//TEST PROTECTED ROUTE
app.get(
  "/testAuth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send(`You're logged in !`);
  }
);

app.listen(PORT, () => {
  console.log(`API root available at http://localhost:${PORT}/`);
});
