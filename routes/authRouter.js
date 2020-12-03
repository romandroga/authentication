const { Router } = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/db");
const randtoken = require("rand-token");

const authRouter = Router();

const saltRounds = 10;

authRouter.post("/registration", (req, res) => {
  const {
    email,
    login,
    realName,
    password,
    birthDate,
    country,
    timestamp,
  } = req.body;

  const token = randtoken.generate(16);

  db.query(
    "SELECT * FROM users WHERE (email = ?) OR (login = ?)",
    [email, login],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        return res.send({
          message:
            "Username or password is already in use, please create a new one",
        });
      }

      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO users (email, login, realName, password, birthDate, country, timestamp, token) VALUES (?,?,?,?,?,?,?,?)",
          [email, login, realName, hash, birthDate, country, timestamp, token],
          (err, result) => {
            if (err) throw err;

            return res.send(token);
          }
        );
      });
    }
  );
});

authRouter.post("/login", (req, res) => {
  const { loginOrEmail, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE(email = ?) OR (login = ?)",
    [loginOrEmail, loginOrEmail],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        const hash = bcrypt.compareSync(password, result[0].password);
        if (hash) {
          return res.send(result[0].token);
        }

        return res.status(404).send({ message: "Wrong password" });
      }
      return res.status(404).send({ message: "User is not exist" });
    }
  );
});

authRouter.post("/registration/confirm", (req, res) => {
  const token = req.body.token;

  db.query("SELECT * FROM users WHERE (token = ?)", [token], (err, result) => {
    if (err) throw err;

    return res.send(result)
  });
});

module.exports = authRouter;
