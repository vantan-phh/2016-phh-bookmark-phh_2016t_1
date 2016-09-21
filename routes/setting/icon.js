var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('../../connection');
var multer = require('multer');
var fs = require('fs');
var crypto = require('crypto');

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
  fs.writeFileSync("./icons/" + digest, content);
  fs.unlink(tmpfile);
  return digest;
}

router.get('/', function (req, res) {
  if (req.session.userId && req.session.userName) {
    res.render('./icon.ejs');
  } else {
    res.redirect('/login');
  }
});

router.post('/', iconUpload.single('icon'), function (req, res) {
  if (req.session.userId && req.session.userName) {
    var userId = req.session.userId;
    var filename = md5hash(req.file.path);
    console.log(filename);
    mysql_promise(
      "UPDATE `users` SET `icon` = ?, `time_updated` = ? WHERE id = ?",
      [filename, new Date().getTime(), userId]
    ).then(function () {
      res.redirect('/setting/icon');
    }).catch(function () {
      res.redirect('/setting/icon');
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
