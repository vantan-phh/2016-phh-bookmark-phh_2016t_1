var express = require('express');
var router = express.Router();
var connection = require('../connection');
var permission = require('../permission');

router.post('/', function (req, res) {
  var orgId = req.params.orgId;
  var id = req.params.id;
  console.log(orgId);
  distribution(orgId,id);
  res.render("members.ejs");
});

module.exports = router;
