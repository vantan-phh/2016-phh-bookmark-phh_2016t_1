// データベースから情報を出してやるぞテスト
var express = require('express');
var connection = require('../connection');
var router = express.Router();

function youtubeEmbed(url) {
  if (/youtube\.com\/watch/.test(url)) {
    var paramstr = url.split("?")[1];
    if (paramstr) {
      var params = paramstr.split("&");
      if (params) {
        var videoId = "";
        for (var i = 0; i < params.length; i++) {
          if (/v=\w{11}/.test(params[i])) {
            videoId = params[i].slice(2);
            params.splice(i,1);
            break;
          }
        }
        if (videoId) {
          return !params.length ? `//www.youtube.com/embed/${videoId}` : `//www.youtube.com/embed/${videoId}?${params.join("&")}`;
        }
      }
    }
  }
  return null;
}

router.get('/:urlId(\\d+)/:orgId(\\d+)', function (req, res) {
 var unity = []; // id, icon, comment で構成されるオブジェクトが入る配列
 var id = req.params.urlId;
 var orgId = req.params.orgId;
 connection.query("SELECT * FROM `urls` WHERE `id` = ?", [id], function(err, result) {
   if(err)console.log(err);
   connection.query("SELECT `id`, `userId`, `comment` FROM `orgComments` WHERE `urlId` = ? AND `orgId` = ?", [id, orgId],
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
         unity[i] = {
           id: resu[i].userId,
           icon: re[i].icon,
           displayName: re[i].displayName,
           comment: resu[i].comment,
           commentId: resu[i].id
         };
       }
       //console.log(unity[1].displayName);

       result[0].youtube = youtubeEmbed(result[0].url);

       res.render('./entry.ejs', {
         urlId:id,
         union: unity,
         urlResult: result[0],
         orgId: orgId
       });
     })
   })
 });
});

module.exports = router;
