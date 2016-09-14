var express = require('express');
var router = express.Router();
var connection = require('../connection');
var common = require('../common');
var com = new common(connection);

function invitePromise(userId, orgId) {
  console.log(userId, orgId);
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO `joiningOrgs`(userId, orgId, permission) SELECT ?, ?, 1 AS TMP WHERE NOT EXISTS (SELECT * FROM `joiningOrgs` WHERE userId = ? AND orgId = ?)",
    [userId, orgId, userId, orgId], function (error, result, fields) {
      if (result) resolve(result);
      if (error) reject(error);
    });
  });
}

router.post('/', function (req, res) {
  var userId = req.session.userId;
  if (userId == undefined) {
    res.status(400).send('not logged in.');
  }
  var orgId = req.body.orgId;
  var invitees = req.body.invitees; // array
  console.log(userId, invitees, orgId);
  com.orgPermissions(orgId)
  .then((perms) => { return new Promise( (resolve, reject) => {
    for (var p of perms) {
      if (p.userId == userId) {
        if (p.permission > 1) {
          resolve();
        } else {
          console.log("not admin");
          res.status(401).send('You are not admin of this org');
        }
      }
    }});
  }).then(function () { return new Promise( (resolve, reject) => {
    Promise.all(invitees.map((inv) => {
      invitePromise(inv, orgId);
    })).then(() => {
      console.log("invited");
      res.send("success");
    }).catch(() => {
      reject();
    });
  })}).catch(function () {
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;
