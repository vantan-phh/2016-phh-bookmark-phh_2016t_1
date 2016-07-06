var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');

var connection = require('../connection');

router.get('/', function (req, res) {
  res.render('./register.ejs',
    {
      warn: ""
    }
  );
});

router.post('/', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  for (var i = 0; i < 10000; i++) {
    password = sha256gen(password);
  }
  console.log(password);
  var name = req.body.name;
  console.log(username, password, name);
  connection.query('SELECT * FROM `users` WHERE `username` = ? LIMIT 1', [username], function (error, result, fields) {
    var usernameExists = result.length === 1;
    if (!usernameExists) {
      if (username && password && name) {
        res.render('./register.confirm.ejs',
          {
            username: username,
            password: "password",
            name: name
          }
        );
        connection.query(
          "INSERT INTO `users` (`username`, `password`, `name`) VALUES (?, ?, ?)",
          [username, password, name],
        function(error, result, fields){
          console.log(result);
        });
      } else {
        res.render('./register.ejs',
          {
            warn: "全て入力してください"
          }
        );
      }
    } else {
      res.render('./register.ejs',
        {
          warn: "既に存在しているusernameです"
        }
      );
    }
  });
});

module.exports = router;
