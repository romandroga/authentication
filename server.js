const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      session({
        key: "userId",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
          expires: 60 * 60 * 24,
        },
      })
    );


    console.log()

    app.use("/", authRouter);
    app.use("/countries", countriesRouter);

    app.listen(port, callback);
  } catch (e) {
    console.log(e);
  }
};

module.exports = server;
