var express = require('express');
var router = express.Router();

router.get('/:id(\\d+)', function (req, res) {
  var orgId = req.params.id;
  res.render('./members.ejs');
});

module.exports = router;
