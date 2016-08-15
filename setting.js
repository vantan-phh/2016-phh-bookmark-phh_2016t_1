var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : `bookmark`
});
