var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');
var urlParser = require('../urlParser');

function checkJoining(userId, orgId) {
  connection.query(
    "SELECT `id` FROM `joiningOrgs` WHERE `userId` = ? AND `orgId` = ?",
    [userId, orgId],
    function (error, result, field) {
      return result ? !!result.length : false;
      // return true;
    }
  );
}

function getUrlFromTable(resolve, url) {
  connection.query(
    "SELECT `id`, `url` FROM `urls`",
    //resultに取得した内容、fieldにステータス？が入る
    function (err, result, field) {
      var _urlId;
      if(err){
        console.log("現在URLを追加することができません");
        return "現在URLを追加することができません";
      }
      console.log(result);
      var dup = false;
      for (var i = 0; i < result.length; i++) {
        if (result[i].url.match(url)) {
          dup = true;
          _urlId = result[i].id;
        }
      }
      if(dup){
        console.log("このURLは既に存在しています");
      }
      console.log("resolve");
      resolve(_urlId);
    }
  );
}

function createToUser(url, comment, userId) {
  var urlId;
  //既に同じURLが入っていないか検証する
  new Promise(function (resolve, reject) {
    getUrlFromTable(resolve, url);
  }).then(function (_urlId) {
    console.log(_urlId);
    if (_urlId) {
      urlId = _urlId;
      console.log("urlId is ok");
    } else {
      console.log("urlId is null");
    //////////////////////////////////////////////////////////////////////////////

      var parsed = urlParser(url);
      var title = parsed[0], description = parsed[1], thumbnail = parsed[2];

      //URLやそれが持つデータをを追加
      return new Promise(function (resolve, reject) {
        connection.query("INSERT INTO `urls` (`url`, `title`, `description`, `thumbnail`) VALUES(?, ?, ?, ?)",
          [url, title, description, thumbnail], function (error, result, fields) {
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

    connection.query("SELECT `id` FROM `userComments` WHERE `userId` = ? AND `urlID` = ?",
      [userId, urlId], function (error, result, fields) {
        console.log(result);
        var userUrlId = result[0];
        if (userUrlId) {
          userUrlId = userUrlId.id;
          console.log(userUrlId);
        }
        if (userUrlId) {
          console.log("update");
          console.log(comment);
          var query = connection.query("UPDATE `userComments` SET `comment` = ?, `time_updated` = ? WHERE id = ?",
            [comment, new Date().getTime(), userUrlId], function (error, result, fields) {
              if (error) console.log(error);
              console.log(result);
          });
          console.log(query);
        } else {
          console.log("insert");
          var query = connection.query("INSERT INTO `userComments` (`userId`, `urlId`, `comment`, `time_updated`) VALUES (?, ?, ?, ?)",
            [userId, urlId, comment, new Date().getTime()], function (error, result, fields) {
              if (result) console.log(result);
              if (error) console.log(error);
              console.log(query);
          });
        }
    });
  })
}

function createToOrg(url, comment, userId, orgId) {
  console.log(orgId);
  var urlId;
  //既に同じURLが入っていないか検証する
  console.log("test");
  new Promise(function (resolve, reject) {
    getUrlFromTable(resolve, url);
  }).then(function (_urlId) {
    console.log(_urlId);
    if (_urlId) {
      urlId = _urlId;
      console.log("urlId is ok");
    } else {
      console.log("urlId is null");
    //////////////////////////////////////////////////////////////////////////////

      var parsed = urlParser(url);
      var title = parsed[0], description = parsed[1], thumbnail = parsed[2];

      //URLやそれが持つデータをを追加
      return new Promise(function (resolve, reject) {
        connection.query("INSERT INTO `urls` (`url`, `title`, `description`, `thumbnail`) VALUES(?, ?, ?, ?)",
          [url, title, description, thumbnail], function (error, result, fields) {
            if (!result) {
              console.log(error);
              return 1;
            }
            urlId = result.insertId;
            console.log(result.insertId);
            console.log(urlId);
            resolve();
        })
      });
    }
  }).then(function () {
    console.log(userId, urlId, comment, orgId);

    connection.query("SELECT `id` FROM `orgComments` WHERE `userId` = ? AND `urlID` = ? AND `orgId` = ?",
      [userId, urlId, orgId], function (error, result, fields) {
        console.log(error);
        console.log(result);
        var orgUrlId;
        if (result.length) {
          orgUrlId = result[0].id;
          console.log(orgUrlId);
          console.log("update");
          console.log(comment);
          var query = connection.query("UPDATE `orgComments` SET `comment` = ?, `time_updated` = ? WHERE id = ?",
            [comment, new Date().getTime(), orgUrlId], function (error, result, fields) {
              if (result) console.log(result);
              if (error) console.log(error);
          });
          // console.log(query);
        } else {
          console.log("insert");
          var query = connection.query("INSERT INTO `orgComments` (`orgId`, `userId`, `urlId`, `comment`, `time_updated`) VALUES(?, ?, ?, ?, ?)",
            [orgId, userId, urlId, comment, new Date().getTime()], function (error, result, fields) {
              if (result) console.log(result);
              if (error) console.log(error);
          });
          // console.log(query);
        }
    });
  });
}

router.post('/user', function (req, res) {
  console.log("user");
  if (req.session.userId && req.session.userName) {
    var userId = req.session.userId;
    var url = req.body.url;
    var comment = req.body.comment;
    createToUser(url, comment, userId);
  } else {
    res.redirect('/login');
  }
});

router.post('/org', function (req, res) {
  if (req.session.userId && req.session.userName) {
    var orgId = Number(req.body.orgId);
    console.log("hbsdfeijldsfhbwefojflkhkwo;bjkl", orgId);
    var userId = req.session.userId;
    var url = req.body.url;
    var comment = req.body.comment;
    // if (checkJoining(userId, orgId)) {
    if (true) {
      createToOrg(url, comment, userId, orgId);
    } else {
      console.log("その人はその組織に入ってない");
    }
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
