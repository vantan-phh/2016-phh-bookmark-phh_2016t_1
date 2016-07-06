var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');

router.get('/', function (req, res) {
  res.render('./login.ejs');
});

router.post('/', function (req, res) {
  if (req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;
    for (var i = 0; i < 10000; i++) {
      password = sha256gen(password);
    }
    connection.query(
      'SELECT `id`, `name` FROM `users` WHERE `username` = ? AND `password` = ?',
      [username, password],
      function (error, result, fields) {
        console.log(result);
        if (result.length === 1) {
          var uid = result[0].id;
          var uname = result[0].name;
        } else {
          var uid = false;
          var uname = false;
        }
        if (uid && uname) {
          console.log(uid);
          req.session.uid = uid;
          req.session.uname = uname;
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      }
    );
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
