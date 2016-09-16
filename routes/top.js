var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');
var common = require('../common');
var com = new common(connection);

router.get('/', function (req, res) {
  console.log("TOP");
  if (req.session.userId && req.session.userName) {
    console.log("logged in");
    var userName = req.session.userName;
    var userId = req.session.userId;
    console.log(userId);
    com.joiningOrgs(userId)
    .then((orgIds) => {
      return com.orgInfo(orgIds);
    })
    .then((orgs) => {
      console.log(orgs);
      if (orgs == undefined) {
        orgs = {};
      }
      res.render('./orglist.ejs', {
        orgs: orgs,
      });
    });
  } else {
    res.render('./topPage.ejs');
  }
});

router.post('/', function (req, res) {
});

module.exports = router;
