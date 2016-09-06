// データベースから情報を出してやるぞテスト
var express = require('express');
var connection = require('../connection');
var router = express.Router();

router.get('/:id(\\d+)', function (req, res) {
  var unity = []; // id, icon, comment で構成されるオブジェクトが入る配列
  var id = req.params.id;
  var orgId = //ください
  connection.query("SELECT * FROM `urls` WHERE `id` = ?", [id], function(err, result) {
    if(err)return "指定のエントリーが存在しない可能性があります";
    connection.query("SELECT `userId` `comment` FROM `orgsComment` WHERE urlId = ? AND orgId = ?", [result.id, orgId]
    function(err, res) {
      if(err)return "うえい";
      var str = "SELECT `icon` FROM `users` WHERE id = ?"
      for(var i = 0; i < res.length; i++) {
        str += res[i].userId + " OR id = "
      }
      connection.query(str, function(err, re) {
        if(err)return "えええ？"
        for(var i = 0; i < re.length; i++) {
          unity[i] = {id: res[i].userId, icon: re[i].icon, comment: res[i].comment};
        }
        result // urlの内容
        unity // 結果
      })
    })
  });
  res.render('./entry.ejs');
});

module.exports = router;
