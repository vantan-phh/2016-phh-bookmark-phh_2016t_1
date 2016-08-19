var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('./createorgPage.ejs',{
  });
});

module.exports = router;
