var express = require('express');
var router = express.Router();

var connection = require('../connection');

router.post('/', function (req, res) {
  var orgId = req.params.orgId;
  var invitees = req.params.invitees; // array
  for (var invitee of invitee) {
    connection.query('SELECT permission FROM `joiningOrgs` WHERE `userId` = ? AND `orgId` = ?', [userId, orgId], function (error, result, fields) {
      console.log(result[0].permission);
      if (true) {
        connection.query('INSERT INTO `joiningOrgs` (userId, orgId) VALUES (?, ?)', [orgId, invitee.id], function (error, result, fields) {
          if (!error) {

          }
        });
      }
    });
  }
});

module.exports = router;
