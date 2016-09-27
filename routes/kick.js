var express = require('express');
var router = express.Router();
var connection = require('../connection');
var common = require('../common');
var com = new common(connection);

function kickPromise(userId, orgId) {
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
  var kickedId = req.body.kickedId;
  console.log(userId, kickedId, orgId);
  com.orgPermissions(orgId)
  .then((perms) => { return new Promise( function (resolve, reject) {
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
  }).then(function () { return new Promise( function (resolve, reject) {
    connection.query('SELECT * FROM `joiningOrgs` WHERE `id` = ? AND `orgId` = ? LIMIT 1', [kickedId, orgId], function (error, result, fields) {
      if (result.length == 1) {
        resolve();
      } else {
        res.status(400).send('no such that user in this org');
      }
    });
  })}).then(function () { return new Promise( function (resolve, reject) {
    kickPromise(kickedId, orgId).then(() => {
      res.status(200).send("success");
    }).catch(() => {
      reject();
    });
  })}).catch(() => {
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;
