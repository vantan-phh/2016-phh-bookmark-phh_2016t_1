var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');
var urlParser = require('../urlParser');

function create(url, comment, userId) {
  var superResult;
  var urlId;
  //既に同じURLが入っていないか検証する
  console.log("test");
  new Promise(function (resolve, reject) {
    connection.query(
      "SELECT `id`, `url` FROM `urls`",
      //resultに取得した内容、fieldにステータス？が入る
      function(err, result, field){
        if(err){
          console.log("現在URLを追加することができません");
          return "現在URLを追加することができません";
        }
        console.log(result);
        var dup = false;
        for (var i = 0; i < result.length; i++) {
          if (result[i].url.match(url)) {
            dup = true;
            urlId = result[i].id;
          }
        }
        if(dup){
          console.log("このURLは既に存在しています");
        }
        console.log("resolve");
        resolve();
      }
    );
  }).then(function () {
    console.log(urlId);
    if (urlId) {
      console.log("urlId is ok");
    } else {
      console.log("urlId is null");
    //////////////////////////////////////////////////////////////////////////////

      var parsed = urlParser(url);
      var title = parsed[0], description = parsed[1], image = parsed[2];

      //URLやそれが持つデータをを追加
      return new Promise(function (resolve, reject) {
        connection.query("INSERT INTO `urls` (`url`, `title`, `description`, `image`) VALUES(?, ?, ?, ?)",
          [url, title, description, image], function (error, result, fields) {
            if (!result) {
              console.log(error);
              return 1;
            }
            urlId = result.insertId;
            console.log(result.insertId);
            console.log("resolve");
            console.log(urlId);
            resolve();
        })
      });
    }
  }).then(function () {
    console.log(userId, urlId, comment);

    connection.query("SELECT `id` FROM `user_url` WHERE `userId` = ? AND `urlID` = ?",
      [userId, urlId], function (error, result, fields) {
        console.log(result);
        var userUrlId = result[0];
        if (userUrlId) userUrlId = userUrlId.id;
        console.log(userUrlId);
        if (userUrlId) {
          console.log("update");
          console.log(comment);
          var query = connection.query("UPDATE `user_url` SET `comment` = ? WHERE id = ?",
            [comment, userUrlId], function (error, result, fields) {
              if (error) console.log(error);
              console.log(result);
          });
          console.log(query);
        } else {
          console.log("insert");
          var query = connection.query("INSERT INTO `user_url` (`userId`, `urlId`, `comment`) VALUES(?, ?, ?)",
            [userId, urlId, comment], function (error, result, fields) {
              console.log(result);
          });
          console.log(query);
        }
    });
  })
}

router.post('/', function (req, res) {
  if (req.session.userId && req.session.userName) {
    var userName = req.session.userName;
    var userId = req.session.userId;
    var url = req.body.url;
    var comment = req.body.comment;
    create(url, comment, userId);
  } else {
    // res.redirect('/login');
  }
});

module.exports = router;
