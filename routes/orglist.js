var express = require('express');
var router = express.Router();
var connection = require('../connection');
var common = require('../common');
var com = new Common(connection);

router.get('/', function (req, res) {
  var userId = req.session.userId;
  com.joiningOrgs(userId)
  .then((orgIds) => {
    return com.orgInfo(orgIds);
  })
  .then((orgs) => {
    res.render('./orglist.ejs', {
      orgs: orgs,
    });
  });
});

module.exports = router;
