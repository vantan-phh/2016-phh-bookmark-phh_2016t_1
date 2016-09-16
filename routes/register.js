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
  var displayName = req.body.displayName;
  var email = req.body.email;
  var password = req.body.password;
  password = sha256gen(password);
  connection.query('SELECT * FROM `users` WHERE `name` = ? OR `email` = ? LIMIT 1', [userName, email], function (error, result, fields) {
    var userNameExists = result.length === 1;
    if (!userNameExists) {
      if (userName && email && password) {
        //res.send(userName + "で登録しました");
        connection.query(
          "INSERT INTO `users` (`name`, `displayName`, `email`,  `password`, `icon`, `time_updated`) VALUES (?, ?, ?, ?, 'sample.png', ?)",
          [userName, displayName, email, password, (+new Date())],
        function(error, result, fields){
          console.log(result);
          res.redirect('/login'); //登録後にloginPageに飛ぶ
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
