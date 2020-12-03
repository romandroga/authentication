const mysql = require('mysql');
const config = require('./db.config')


const db = mysql.createPool({
  user: config.USER,
  host: config.HOST,
  password: config.PASSWORD,
  database: config.DATABASE,
});

module.exports = db;
