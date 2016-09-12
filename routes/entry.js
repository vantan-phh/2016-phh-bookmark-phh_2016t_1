// データベースから情報を出してやるぞテスト
var express = require('express');
var connection = require('../connection');
var router = express.Router();

router.get('/:urlId(\\d+)/:orgId(\\d)', function (req, res) {
 var unity = []; // id, icon, comment で構成されるオブジェクトが入る配列
 var id = req.params.urlId;
 var orgId = req.params.orgId;
 connection.query("SELECT * FROM `urls` WHERE `id` = " + id, function(err, result) {
   if(err)console.log(err);
   connection.query("SELECT `userId`, `comment` FROM `orgComments` WHERE `urlId` = ? AND `orgId` = ?", [result[0].id, orgId],
   function(err, resu) {
     if(err || resu[0] == undefined)console.log("a");
     var str = "SELECT `icon`, `displayName` FROM `users`"
     for(var i = 0; i < resu.length; i++) {
       if(i == 0) str += " WHERE id = "
       str += resu[i].userId
       if(!(i == resu.length - 1)) {
         str += " OR id = "
       }
     }
     connection.query(str, function(err, re) {
       if(err)console.log(err);
       for(var i = 0; i < re.length; i++) {
         unity[i] = {id: resu[i].userId, icon: re[i].icon, displayName: re[i].displayName, comment: resu[i].comment};
       }
       //console.log(unity[1].displayName);
       res.render('./entry.ejs', {
         union: unity,
         urlResult: result[0],
         orgId: orgId
       });
     })
   })
 });
});

module.exports = router;
