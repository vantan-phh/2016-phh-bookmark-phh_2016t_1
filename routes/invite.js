var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = require('../connection');

router.post('/', function (req, res) {
  var orgId = req.params.orgId;
  var invitees = req.params.invitees; // array
  for (var invitee of invitee) {
    connection.query('INSERT INTO `joiningOrgs` (userId, orgId) VALUES (?, ?)', [orgId, invitee.id], function (error, result, fields) {
      if (!error) {

      }
    });
  }

});

module.exports = router;
