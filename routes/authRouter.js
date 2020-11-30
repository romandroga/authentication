const { Router } = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/db');

const saltRounds = 10;

const authRouter = Router();

authRouter.post('/registration', (req, res) => {
  const {
    email,
    login,
    realName,
    password,
    birthDate,
    country,
    timestamp,
  } = req.body;

  db.query(
    'SELECT * FROM users WHERE (email = ?) OR (login = ?)',
    [email, login],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        return res.send({
          message:
            'Username or password is already in use, please create a new one',
        });
      }

      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          'INSERT INTO users (email, login, realName, password, birthDate, country, timestamp) VALUES (?,?,?,?,?,?,?)',
          [email, login, realName, hash, birthDate, country, timestamp],
          (err, result) => {
            if (err) throw err;

            req.session.user = {email: email, name: realName} /////////?????

            // history.push('http://localhost:3000/')
            res.redirect('/')

            return res.send(result);
          },
        );
      });
    },
  );
});

authRouter.post('/login', (req, res) => {
  const { loginOrEmail, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE(email = ?) OR (login = ?)',
    [loginOrEmail, loginOrEmail],
    (err, result) => {
      if (err) res.send(err);

      if (result.length > 0) {
        const hash = bcrypt.compareSync(password, result[0].password);
        if (hash) {
          req.session.user = {email: result[0].email, name: result[0].realName};
          return res.send(result);
        }

        return res.send({ message: 'wrong password' });
      }
      return res.send({ message: 'User is not exist' });
    },
  );
});

authRouter.get('/login', (req, res) =>{
  // if(req.session.user){
    return res.send({loggedIn: true, user: req.session.user})
  // }
  // return res.send({loggedIn: false})
})



module.exports = authRouter;
