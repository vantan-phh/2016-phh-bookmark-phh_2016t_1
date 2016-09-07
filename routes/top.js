var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');

router.get('/', function (req, res) {
  console.log("TOP");
  if (req.session.userId && req.session.userName) {
    console.log("logged in");
    var userName = req.session.userName;
    var userId = req.session.userId;
    console.log(userId);
    connection.query("SELECT `orgId` FROM `joiningOrgs` WHERE userId = ?", [userId], function(err, res) {
      if(err)console.log("タイムラインは死んだ");
      var orgId = res;
      console.log(orgId);
    });

    res.render('./bookmark.ejs',{
      name: userName,
      userId: userId,
    });
  } else {
    res.render('./topPage.ejs');
  }
});

router.post('/', function (req, res) {
});

module.exports = router;
