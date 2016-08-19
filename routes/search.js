var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
  query = req.query.q;
  res.render('./search.ejs',{
    query: query
  });
});

module.exports = router;
