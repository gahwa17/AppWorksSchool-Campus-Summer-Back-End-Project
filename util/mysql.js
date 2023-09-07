const mysql = require("mysql2/promise");
require("dotenv").config();

// const database = process.env.NODE_ENV === "test" ? "Canchu_test" : "Canchu";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = pool;

/* MySQL connection setting
- host: '52.65.80.187', // Origin: EC2 host
- host: 'mysql',        // Docker: MySQL's container name
*/
