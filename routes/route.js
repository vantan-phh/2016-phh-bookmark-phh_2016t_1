var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');

router.get('/', function (req, res) {
  if (req.session.uid && req.session.uname) {
    var uname = req.session.uname;
    var uid = req.session.uid;
    res.render('./bookmark.ejs',{
      name: uname
    })
  } else {
    res.redirect('/login');
  }
});

router.post('/', function (req, res) {

});

module.exports = router;
