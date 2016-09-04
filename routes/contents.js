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
          console.log(result);
          if (result.length === 0) {
            reject("url is unavailable");
          }
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

router.post('/user', function (req, res) {
  // ここにpost送るとuserIdで探してデータベースから返してくれる
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
        if (err) reject(err);
        result = result.sort((a, b) => (a.urlId < b.urlId ? -1 : 1));
        console.log(result);


        // Comment = {
        //   id: result,
        //   orgId: 3,
        //   urlId: 10,
        //   comments: [{
        //     userId: 1,
        //     text: "comment",
        //     time_updated: 1234567890123
        //   }],
        //   [{
        //     userId: 1,
        //     text: "comment",
        //     time_updated: 1234567890123
        //   }]
        // }


        for (var i = 0; i < result.length; i++) {
          var resultObj = {
            id: result[i].id,
            orgId: result[i].orgId,
            urlId: result[i].urlId,
            comments: [{
              userId: result[i].userId,
              text: result[i].comment,
              time_updated: result[i].time_updated
            }]
          }
          resultArr.push(resultObj);
        }
        // console.log(resultArr);
        resolve(resultArr);
      }
    );
  }).then(function (resultArr) {
    console.log(0, resultArr, 0);
    var preUrl = resultArr[0].urlId;
    for (var i = 1; i < resultArr.length; i++) {
      if (preUrl == resultArr[i].urlId) {
        resultArr[i-1].comments.push(resultArr[i].comments[0]);
        resultArr.splice(i, 1);
        i--;
      } else {
        preUrl = resultArr[i].urlId;
      }
    }
    console.log(1, resultArr, 1);
    Promise.all(resultArr.map(function (resultObj) {
      return getUrlDetail(resultObj);
    })).then(function (gettedResultArr) {
      var str = JSON.stringify(gettedResultArr);
      console.log("4send json",str);
      res.send(str);
    });
  });
});

module.exports = router;
