const express = require("express");
const path = require("path");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const countriesRouter = require("./routes/countriesRouter");

const server = async (port, callback) => {
  try {
    const app = express();

    app.use(express.static(path.join(__dirname, "client/build")));

    app.use(express.json());

    app.use(cors());

    app.use("/", authRouter);
    app.use("/countries", countriesRouter);

    app.listen(port, callback);
  } catch (e) {
    console.log(e);
  }
};

module.exports = server;
