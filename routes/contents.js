// データベースから情報を出してやるぞテスト
var express = require('express');
var connection = require('../connection');
var router = express.Router();

function getUrlDetail(resultObj) {
  return new Promise(function (resolve, reject) {
    connection.query(
      "SELECT * FROM `urls` WHERE `id` = ?",
      [resultObj.urlId],
      function (err, result, field) {
        try {
          if(err) throw new Error(err.code);
          resultObj.url = result[0].url;
          resultObj.title = result[0].title;
          resultObj.description = result[0].description;
          resultObj.thumbnail = result[0].thumbnail;
          resolve(resultObj);
        } catch(e) {
          reject(e);
        }
      }
    );
  });
}

router.post('/user', function (req, res) { // ここにpost送るとuserIdで探してデータベースから返してくれる
  new Promise(function (resolve, reject) {
    connection.query(
      "SELECT * FROM `userComments` WHERE `userId` = ?",
      [req.session.userId],
      //resultに取得した内容、fieldにステータス？が入る
      function (err, result, field) {
        var resultArr = [];
        console.log(req.session.userId);
        if (err) console.log(err);
        for (var i = 0; i < result.length; i++) {
          var resultObj = {};
          resultObj.id = result[i].id;
          resultObj.userId = result[i].userId;
          resultObj.urlId = result[i].urlId;
          resultObj.comment = result[i].comment;
          resultObj.time_updated = result[i].time_updated;
          resultArr.push(resultObj);
        }
        resolve(resultArr);
      }
    );
  }).then(function (resultArr) {
    Promise.all(resultArr.map(function (resultObj) {
      return getUrlDetail(resultObj);
    })).then(function (gettedResultArr) {
      var str = JSON.stringify(gettedResultArr);
      console.log(str);
      res.send(str);
    });
  });
});

router.post('/org', function (req, res) { // ここにpost送るとourIdで探してデータベースから返してくれる
  orgId = req.body.orgId;
  new Promise(function (resolve, reject) {
    connection.query(
      "SELECT * FROM `orgComments` WHERE `orgId` = ?",
      [orgId],
      function (err, result, field) {
        var resultArr = [];
        console.log(req.body.orgId);
        console.log(result);
        if (err) console.log(err);
        for (var i = 0; i < result.length; i++) {
          var resultObj = {};
          resultObj.id = result[i].id;
          resultObj.userId = result[i].userId;
          resultObj.urlId = result[i].urlId;
          resultObj.comment = result[i].comment;
          resultObj.time_updated = result[i].time_updated;
          resultArr.push(resultObj);
        }
        resolve(resultArr);
      }
    );
  }).then(function (resultArr) {
    Promise.all(resultArr.map(function (resultObj) {
      return getUrlDetail(resultObj);
    })).then(function (gettedResultArr) {
      var str = JSON.stringify(gettedResultArr);
      console.log(str);
      res.send(str);
    });
  });
});

module.exports = router;
