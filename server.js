const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const countriesRouter = require("./routes/countriesRouter");



const server = async (port, callback) => {
  try {
    const app = express();

    app.use(express.json());


    app.use(
      cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
      })
    );


    app.use("/", authRouter);
    app.use("/countries", countriesRouter);

    app.listen(port, callback);
  } catch (e) {
    console.log(e);
  }
};

module.exports = server;
