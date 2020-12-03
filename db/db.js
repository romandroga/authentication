const mysql = require('mysql');
const config = require('../config')

const db = mysql.createConnection({
  user: config.user,
  host: config.host,
  password: config.password,
  database: config.database,
});

module.exports = db;
