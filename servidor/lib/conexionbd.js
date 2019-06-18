var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 8080,
  user     : 'root',
  password : '',
  database : 'p9queveohoy'
});

module.exports = connection;

