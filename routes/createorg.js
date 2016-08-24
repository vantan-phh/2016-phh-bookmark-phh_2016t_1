var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = require('../connection');

router.get('/', function (req, res) {
  res.render('./createorg.ejs');
});

router.post('/', function (req, res) { // htmlのフォームに入ったものをそのままデータベースに入れる
  var name = req.body.orgName;
  var description = req.body.orgDescription;
  connection.query('SELECT * FROM `orgs` WHERE `name` = ? OR `description` = ? LIMIT 1', [name, description], function (error, result, fields) {
    var orgExists = result ? result.length === 1 : false ;
    if (!orgExists) {
      if (name && description) {
        connection.query(
          "INSERT INTO `orgs` (`name`, `description`) VALUES (?, ?)",
          [name, description],
          function(error, result, fields){
            console.log(result);
            var orgId = result.insertId;
            var userId = req.session.userId;
            connection.query("INSERT INTO `joiningOrgs` (`userId`, `orgId`, `permission`) VALUES (?, ?, 2)", [userId, orgId], function () {
              res.redirect(301, '/org/'+result.insertId);
            });
          }
        );
      } else {
        console.log("ぜんぶいれて");
        res.render('./createorg.ejs');
      }
    } else {
      console.log("既に存在");
      res.render('./createorg.ejs');
    }
  });
});

module.exports = router;
