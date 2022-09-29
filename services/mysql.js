const mysql = require('mysql'); // import mysql
// config mysql
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DBNAME || '',
});

connection.connect();

// untuk simple & promise
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

module.exports = {
  query
}
