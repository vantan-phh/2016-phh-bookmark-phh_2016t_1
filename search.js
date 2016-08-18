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
  var kenmo = [];
  var urlIdire = [];
  for(var i = 0; i < kenm.length; i++) {
    kenmo.push(kenm[i].substr(1).substr(0, kenm[i].length - 2));
  }
  var comment = [];
  var title = [];
  var flag = 0;
  kozinkensaku(kenm[0]);
  sosikikensaku(kenm[0]);

  function kozinkensaku(kenmozii) {
    mysql.query('SELECT `urlId`, `comment` FROM `userComments` WHERE userId = ?',
    [id], function(err, result) {
      if(err || !result){flag++; return;}
      for(var j = 0; j < result.length; j++) {
        for(var i = 0; i < kenmo.length; i++) {
          if(result[j].comment && result[j].comment.match(kenmo[i])){
            comment.push(result[j]);
            break;
          };
        }
      }
      var str = 'SELECT `title`, `id` FROM `urls` WHERE'
      var moziire = [];
      var urlire = [];
      for(var i = 0; i < result.length; i++) {
        urlire.push(result[i].urlId)
      }
      if(urlIdire[0]) {
        for(var i = 0; i < urlire.length; i++) {
          for(var j = 0; j < urlIdire.length; j++) {
            if(urlire[i] === urlIdire[j]) {
              urlire.splice(i, 1);
              i--;
              break;
            }
          }
        }
      }else {
        urlIdire = urlire
      }
      for(var i = 0; i < urlire.length; i++) {
        str += " (title LIKE ? AND id = " + urlire[i] + ") OR"
        moziire.push(kenmozii)
      }
      str = str.substr(0, str.length - 3);
      mysql.query(str, moziire, function(err, res) {
        if(err || !res){flag++; return;}
        for(var i = 0; i < res.length; i++) {
          title.push(res[i]);
        }
        kenm.length <= flag ? kenkensaku() : flag++;
        /*commentRes[num].url_id で urlのid
        commentRes[num].comment で コメント
        res[num].title でタイトル*/
      })
    })
  }

  function sosikikensaku(kenmozii) {
    mysql.query('SELECT `orgId` FROM `joiningOrgs` WHERE userId = ?', [id],
    function(err, result) {
      if(err || !result){flag++; return;}
      var strC = 'SELECT `comment`, `urlId` FROM `orgComments` WHERE'
      var moziire = [];

      for(i = 0; i < result.length; i++) {
        strC += " (comment LIKE ? AND orgId = " + result[i].orgId + ") OR";
        moziire.push(kenmozii);
      }
      strC = strC.substr(0, strC.length - 3);
      mysql.query(strC, moziire, function(err, res){
        if(err || !res){flag++; return;}
        var str = 'SELECT `title`, `id` FROM `urls` WHERE'
        hozon = [];
        moziire = [];
        for(var i = 0; i < res.length; i++) {
          hozon.push(res[i].urlId);
        }
        hozon = hozon.filter(function (x, i, self) {
          return self.indexOf(x) === i;
        });
        if(urlIdire[0]) {
          for(var i = 0; i < hozon.length; i++) {
            for(var j = 0; j < urlIdire.length; j++) {
              if(hozon[i] === urlIdire[j]) {
                hozon.splice(i, 1);
                i--;
                break;
              }
            }
          }
        }else {
          urlIdire = hozon
        }
        for(var m = 0; m < hozon.length; m++) {
          str += " (title LIKE ? AND id = " + hozon[m] + ") OR";
          moziire.push(kenmozii);
        }
        str = str.substr(0, str.length - 3);
        mysql.query(str, moziire, function(err, re) {
          if(err || !re){flag++; return;}
          for(var i = 0; i < res.length; i++) {
            comment.push(res[i])
          }
          for(var j = 0; j < re.length; j++) {
            title.push(re[j])
          }
          kenm.length <= flag ? kenkensaku() : flag++;
          /* res[num].comment でコメント, res[num].urlId でURLID
          re[num].title でタイトル, re[num].id でURLID */
        })
      });
    });
  }
  function kenkensaku() {
    var result = [];
    //console.log(comment);
    //console.log(title);
    for(var i = 0; i < kenmo.length; i ++) {
      for(var j = 0; j < comment.length; j++) {
        if(comment[j].comment && comment[j].comment.match(kenmo[i])){result.push(comment[j])};
      }
      for(var t = 0; t < title.length; t++) {
        if(title[t].title && title[t].title.match(kenmo[i])){result.push(title[t])};
      }
    }
    console.log(result);
  }
}

kensaku(1, "%う%")
