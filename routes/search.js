var express = require('express');
var connection = require('../connection');
var router = express.Router();
var kensaku = require('../search.js');


router.get('/', function (req, res) {
  var query = req.query.q;
  console.log(query);
  var userId = req.session.userId;
  kensaku(userId, query).then(function(result) {
    res.render('search.ejs',{
      result: result,
      query: query,
    })
    console.log(result[0].orgId.length);
  });
});

module.exports = router;
