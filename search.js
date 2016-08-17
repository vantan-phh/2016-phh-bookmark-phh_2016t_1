var mysql = require('mysql2/');
var mysql = mysql.createConnection({
  host : "localhost",
  user : "root",
  database : "bookmark"
});

mysql.connect(function(err) {
  if(err){
    console.error("データベースに接続できません");
    return;
  }
});

function kensaku(id, kenmozi) {
  var kenm = kenmozi.split("\s");
  var comment = [];
  var title = [];
  var flag = 0;
  for(var l = 0; l < kenm.length; l++) {
    kozinkensaku(kenm[l]);
    sosikikensaku(kenm[l]);
  }
  function kozinkensaku(kenmozi) {
    mysql.query('SELECT `urlId`, `comment` FROM `userComments` WHERE userId = ?',
    [id], function(err, result) {
      if(err || !result){flag++; return;}
      commentRes = [];
      var kenmo = kenmozi.substr(1);
      kenmo = kenmo.substr(0, kenmo.length - 1);
      for(var j = 0; j < result.length; j++) {
        if(result[j].comment && result[j].comment.match(kenmo))
        {comment.push(result[j])};
      }
      var str = 'SELECT `title`, `id` FROM `urls` WHERE'
      for(var i = 0; i < result.length; i++) {
        str += " id = " + result[i].url_id + " AND title LIKE ? OR"
      }
      str = str.substr(0, str.length - 3);
      mysql.query(str, [kenmozi], function(err, res) {
        console.log(res);
        if(err || !res){flag++; return;}
        comment.push(commentRes);
        title.push(res);
        kenm.length - 1 <= flag ? kenkensaku() : flag++;
        /*commentRes[num].url_id で urlのid
        commentRes[num].comment で コメント
        res[num].title でタイトル*/
      })
    })
  }
  function sosikikensaku(kenmozi) {
    mysql.query('SELECT `orgId` FROM `joiningOrgs` WHERE userId = ?', [id],
    function(err, result) {
      if(err || !result){flag++; return;}
      var strC = 'SELECT `comment`, `urlId` FROM `orgComments` WHERE'
      var moziire = [];
      for(i = 0; i < result.length; i++) {
        strC += (" comment LIKE ?  AND orgId = " + result[i].org_id + " OR");
        moziire.push(kenmozi);
      }
      strC = strC.substr(0, strC.length - 3);
      mysql.query(strC, moziire, function(err, res){
        if(err || res){flag++; return;}
        var str = 'SELECT `title`, `id` FROM `urls` WHERE'
        moziire = [];
        for(var i = 0; i < res.length; i++) {
          str += (" id = " + res[i].urlId + "AND title LIKE ? OR");
          moziire.push(kenmozi);
        }
        str = str.substr(0, str.length - 3);
        mysql.query(str, moziire, function(err, re) {
          if(err || re){flag++; return;}
          comment.push(res)
          title.push(re)
          kenm.length - 1 <= flag ? kenkensaku() : flag++;
          /* res[num].comment でコメント, res[num].urlId でURLID
          re[num].title でタイトル, re[num].id でURLID */
        })
      });
    });
  }
  function kenkensaku() {
    console.log(comment);
    console.log(title);
  }
}

kensaku(1, "%あるぇ%")
