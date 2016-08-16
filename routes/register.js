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
  var email = req.body.email;
  var password = req.body.password;
  for (var i = 0; i < 10000; i++) {
    password = sha256gen(password);
  }
  connection.query('SELECT * FROM `users` WHERE `name` = ? OR `email` = ? LIMIT 1', [userName, email], function (error, result, fields) {
    var userNameExists = result.length === 1;
    if (!userNameExists) {
      if (userName && email && password) {
        //res.send(userName + "で登録しました");
        res.redirect('/login'); //登録後にloginPageに飛ぶ
        connection.query(
          "INSERT INTO `users` (`name`, `email`,  `password`) VALUES (?, ?, ?)",
          [userName, email, password],
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
