var express = require('express');
var router = express.Router();
var connection = require('../connection');
var tagProduction = require('../tagProduction.js');

router.post('/', function (req, res) {
  var tagName = req.params.tagName;
  var urlId = req.params.urlId;
  var orgId = req.params.orgId;

  tagProduction(tagName, urlId, orgId);
});

module.exports = router;
