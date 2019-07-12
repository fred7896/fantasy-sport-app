const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const { jwtSecret, db } = require("./conf");
const {
  Strategy: JWTStrategy,
  ExtractJwt: ExtractJwt
} = require("passport-jwt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      db.query(
        `SELECT id, email, password FROM account WHERE email = ${mysql.escape(
          email
        )} LIMIT 1`,
        (err, rows) => {
          if (err) {
            return done(err, false, {
              message: `Server crashed, here is the message: ${err}`
            });
          }

          const user = rows[0];

          if (!user) {
            return done(null, false, { message: "Utilisateur non trouvé" });
          } else {
            bcrypt.compare(password, user.password, (errBcrypt, result) => {
              if (errBcrypt) return done(errBcrypt);
              if (result) {
                return done(
                  null,
                  {
                    id: user.id,
                    email: user.email,
                    password: user.password
                  },
                  {
                    message: "Success"
                  }
                );
              }
              return done(null, false, {
                message: `Email ou mot de passe erronée.`
              });
            });
          }
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);
