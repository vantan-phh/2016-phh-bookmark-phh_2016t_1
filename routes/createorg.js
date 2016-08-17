var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = require('../connection');

router.get('/', function (req, res) {
  res.render('./addorg.ejs');
});

router.post('/', function (req, res) {
  var name = req.body.orgName;
  var description = req.body.orgDescription;
  connection.query('SELECT * FROM `orgs` WHERE `name` = ? OR `description` = ? LIMIT 1', [name, description], function (error, result, fields) {
    var orgExists = result.length === 1;
    if (!orgExists) {
      if (name && description) {
        connection.query(
          "INSERT INTO `orgs` (`name`, `description`) VALUES (?, ?)",
          [name, description],
          function(error, result, fields){
            console.log(result);
            res.redirect(301, '/org/'+result.insertId);
          }
        );
      } else {
        console.log("ぜんぶいれて");
        res.render('./addorg.ejs');
      }
    } else {
      console.log("既に存在");
      res.render('./addorg.ejs');
    }
  });
});

module.exports = router;
