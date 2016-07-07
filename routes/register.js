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
  var userName = req.body.userName;
  var password = req.body.password;
  for (var i = 0; i < 10000; i++) {
    password = sha256gen(password);
  }
  connection.query('SELECT * FROM `users` WHERE `name` = ? LIMIT 1', [userName], function (error, result, fields) {
    var userNameExists = result.length === 1;
    if (!userNameExists) {
      if (userName && password) {
        res.send(userName + "で登録しました");
        connection.query(
          "INSERT INTO `users` (`name`, `password`) VALUES (?, ?)",
          [userName, password],
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
          warn: "既に存在しているuserNameです"
        }
      );
    }
  });
});

module.exports = router;
