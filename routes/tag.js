var express = require('express');
var router = express.Router();
var connection = require('../connection');
var tagProduction = require('../tagProduction.js');

router.post('/', function (req, res) {
  var tagName = req.body.tagName;
  var urlId = req.body.urlId;
  var orgId = req.body.orgId;
  //console.log(tagName);
  //console.log(urlId);
  //console.log(orgId);
  tagProduction(tagName, urlId, orgId).then(function(result) {
    console.log("たぐ作った");
  },function(err) {
    console.log(err);
  })
  
});

module.exports = router;
