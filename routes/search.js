var express = require('express');
var router = express.Router();
var kensaku = require('../search.js');


router.get('/', function (req, res) {
  var query = req.query.q;
  var userId = req.session.userId;
  kensaku(query);
});

module.exports = router;
