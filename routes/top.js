var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');

router.get('/', function (req, res) {
  console.log("TOP");
  if (req.session.userId && req.session.userName) {
    var userName = req.session.userName;
    var userId = req.session.userId;
    res.render('./bookmark.ejs',{
      name: userName
    })
  } else {
    res.redirect('/login');
  }
});

router.post('/', function (req, res) {

});

module.exports = router;
