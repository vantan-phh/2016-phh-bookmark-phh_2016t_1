var express = require('express');
var connection = require('../connection');
var router = express.Router();
var kensaku = require('../search.js');


router.get('/', function (req, res) {
  var query = req.query.q;
  console.log(query);
  var userId = req.session.userId;
  var result;
  kensaku(userId, query).then(function(result) {
    console.log(result);
  });
  res.render('search.ejs',{
    query: query,
    result: result
  })
});

module.exports = router;
