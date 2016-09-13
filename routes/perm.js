var express = require('express');
var router = express.Router();
var connection = require('../connection');
var permission = require('../permission');

router.post('/', function (req, res) {
  var orgId = req.params.orgId;
  console.log(orgId);
  distribution(orgId,userId);
  res.render("members.ejs");
});

module.exports = router;
