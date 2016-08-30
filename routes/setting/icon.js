var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = require('../../connection');


function mysql_promise(query, array) {
  console.log(query);
  return new Promise( (resolve, reject) => {
    connection.query( query, array,
      function (error, result, fields) {
        if (result) resolve(result);
        if (error) reject(error);
      }
    );
  });
}


router.get('/', function (req, res) {
  if (req.session.userId && req.session.userName) {
    res.render('./icon.ejs');
  } else {
    res.redirect('/login');
  }
});

router.post('/', function (req, res) {
  if (req.session.userId && req.session.userName) {
    var userId = req.session.userId;
    console.log(req.file);
    mysql_promise(
      "SELECT * FROM `icons` WHERE `userId` = ?",
      [userId]
    ).then(function (result) {
      if (result.length === 0) {
        return mysql_promise(
          "INSERT INTO `icons` (`userId`, `path`, `time_updated`) VALUES (?, ?, ?)",
          [userId, req.file.filename, new Date().getTime()]
        );
      } else {
        return mysql_promise(
          "UPDATE `icons` SET `path` = ?, `time_updated` = ? WHERE userId = ?",
          [req.file.filename, new Date().getTime(), userId]
        );
      }
    }).then(function () {
      res.redirect('/setting/icon');
    }).catch(function () {
      res.redirect('/setting/icon');
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
