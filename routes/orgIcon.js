var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('../connection');
var common = require('../common');
var multer = require('multer');
var fs = require('fs');
var crypto = require('crypto');
var com = new common(connection);

function mysql_promise(query, array) {
  console.log(query);
  return new Promise( (resolve, reject) => {
    connection.query( query, array,
      function (error, result, fields) {
        if (result) resolve(result);
        if (error) {
          console.log(error);
          reject(error)
        };
      }
    );
  });
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './icons/tmp');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, "tmp" + '-' + (+new Date()));
  }
});
var iconUpload = multer({ storage: storage });

function md5hash(tmpfile) {
  var content = fs.readFileSync(tmpfile);
  var md5 = crypto.createHash('md5');
  md5.update(content);
  var digest = md5.digest('hex') + "-" + (+new Date());
  fs.writeFileSync("icons/" + digest, content);
  fs.unlink(tmpfile);
  return digest;
}

router.post('/', iconUpload.single('icon'), function (req, res) {
  var userId = req.session.userId;
  var orgId = req.body.orgId;
  var filename = md5hash(req.file.path);
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
  }).then(() => {
    console.log(filename);
    mysql_promise(
      "UPDATE `orgs` SET `icon` = ? WHERE id = ?",
      [filename, orgId]
    ).then(function () {
      res.status(200).send('success');
    }).catch(function () {
      res.status(500).send('Internal Server Error');
    });
  }).catch(() => {
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;
