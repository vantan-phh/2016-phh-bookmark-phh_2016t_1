var express = require('express');
var router = express.Router();

router.get('/:id(\\d+)', function (req, res) {
  var userId = req.params.id;
  res.render('./joiningOrgs.ejs');
});

module.exports = router;
