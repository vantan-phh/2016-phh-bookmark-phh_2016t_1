var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : `phh_test_bkm_1`
});

module.exports = connection;
