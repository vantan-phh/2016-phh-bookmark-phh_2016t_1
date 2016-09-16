var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');

router.get('/', function (req, res) {
  res.render('./login.ejs');
});
router.post('/', function (req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;

    password = sha256gen(password);
    connection.query(
      'SELECT `id`, `name` FROM `users` WHERE `email` = ? AND `password` = ?',
      [email, password],
      function (error, result, fields) {
        console.log(result);
        if (result.length === 1) {
          var userId = result[0].id;
          var userName = result[0].name;
        } else {
          var userId = false;
        var userName = false;
        }
        if (userId && userName) {
          console.log(userId);
          req.session.userId = userId;
          req.session.userName = userName;
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
