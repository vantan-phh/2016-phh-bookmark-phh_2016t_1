var express = require('express');
var connection = require('../connection');
var router = express.Router();
var kensaku = require('../search.js');


router.get('/', function (req, res) {
  var query = req.query.q;
  console.log(query);
  var userId = req.session.userId;
  kensaku(userId, query).then(function(result) {
    console.log(result);
    res.render('search.ejs',{
      result: result,
      query: query,
    })
  }, function(err) {
    res.render('search.ejs',{
      result:[],
      query: query,
    });

  });
});

module.exports = router;
