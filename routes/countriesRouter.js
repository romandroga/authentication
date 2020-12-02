const { Router } = require("express");
const db = require("../db/db");

const countriesRouter = Router();

countriesRouter.get("/get", (req, res) => {
  db.query("SELECT * FROM countries", (err, result) => {
    if (err) console.log(err);

    res.send(result);
  });
});

module.exports = countriesRouter;
