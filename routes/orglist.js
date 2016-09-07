var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var userId = req.session.userId;
  res.render('./orglist.ejs');
});

module.exports = router;
