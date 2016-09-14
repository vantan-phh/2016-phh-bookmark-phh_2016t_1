var express = require('express');
var router = express.Router();
var connection = require('../connection');

function distribution (orgId, userId) {
  connection.query("UPDATE joiningOrgs SET permission = 2 WHERE orgId = ? AND userId = ?",[orgId, userId], function(err) {if(err)console.log(err)})
}

router.post('/', function (req, res) {
  var orgId = req.body.orgId;
  var id = req.body.id;
  console.log(orgId);
  console.log(id);
  distribution(orgId,id);
});

module.exports = router;
