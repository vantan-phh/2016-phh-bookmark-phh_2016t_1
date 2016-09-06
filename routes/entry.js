// データベースから情報を出してやるぞテスト
var express = require('express');
var connection = require('../connection');
var router = express.Router();

router.get('/:urlId(\\d+)/:orgId(\\d)', function (req, res) {
  var unity = []; // id, icon, comment で構成されるオブジェクトが入る配列
  var id = req.params.urlId;
  var orgId = req.params.orgId;
  connection.query("SELECT * FROM `urls` WHERE `id` = ?", [id], function(err, result) {
    if(err)console.log(err);
    connection.query("SELECT `userId` `comment` FROM `orgsComment` WHERE urlId = ? AND orgId = ?", [result.id, orgId],
    function(err, res) {
      if(err)console.log(err);
      var str = "SELECT `icon` FROM `users` WHERE id = "
      for(var i = 0; i < res.length; i++) {
        str += res[i].userId + " OR id = "
      }
      connection.query(str, function(err, re) {
        if(err)console.log(err);
        for(var i = 0; i < re.length; i++) {
          unity[i] = {id: res[i].userId, icon: re[i].icon, comment: res[i].comment};
        }
        console.log(unity[0]);
        res.render('./entry.ejs', {
          union: unity,
          urlResult: result
        });
      })
    })
  });
});

module.exports = router;
