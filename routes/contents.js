// データベースから情報を出してやるぞテスト
var express = require('express');
var connection = require('../connection');
var router = express.Router();

router.post('/', function (req, res) {
  connection.query(
    "SELECT * FROM `user_url` WHERE `userId` = ?",
    [req.session.userId],
    //resultに取得した内容、fieldにステータス？が入る
    function(err, result, field){
      var resultArr = [];
      console.log(req.session.userId);
      if (result) console.log(result);
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
      var str = JSON.stringify(resultArr);
      console.log(str);
      res.send(str);
    }
  );
});

module.exports = router;
