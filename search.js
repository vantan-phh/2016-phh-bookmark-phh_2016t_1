var connection = require('./connection');

kensaku(id, kenmozi) {
  return new Promise((resolve, reject) => {
    kenmozi = kenmozi.trim();
    var flag = 0;
    for(var i = 0; i < kenmozi.length; i++) {
      if(kenmozi[i] == /\s/) {
        flag ? (kenmozi.splice(i, 1), i--) : flag = 1;
      }else {
        flag = 0;
      }
    }

    var kenmo = kenmozi.split(" ");
    var kenm = [];
    for(var i = 0; i < kenmo.length; i++) {
      kenm.push("%" + kenmo[i] + "%");
    }
    sosikikensaku(id, kenm);
  }

  function sosikikensaku(id, kenmozii) {
    connection.query('SELECT `orgId` FROM `joiningOrgs` WHERE userId = ?', [id],
    function(err, result) {
      if(err || !result[0]) return "検索結果がありません"
      var strC = 'SELECT `comment`, `urlId` FROM `orgComments` WHERE'
      var moziire = [];
      for(var i = 0; i < result.length; i++) {
        for(var j = 0; j < kenmozii.length; j++) {
          strC += " (comment LIKE ? AND orgId = " + result[i].orgId + ") OR";
          moziire.push(kenmozii);
        }
      }
      strC = strC.substr(0, strC.length - 3);
      connection.query(strC, moziire, function(err, res){
        if(err || res[0] == []){flag++; return  "検索結果がありません";}
        var str = 'SELECT `title`, `id` FROM `urls` WHERE'
        hozon = [];
        moziire = [];
        for(var i = 0; i < res.length; i++) {
          hozon.push(res[i].urlId);
        }
        hozon = hozon.filter(function (x, i, self) {
          return self.indexOf(x) === i;
        });
        
        for(var m = 0; m < hozon.length; m++) {
          str += " (title LIKE ? AND id = " + hozon[m] + ") OR";
          moziire.push(kenmozii);
        }
        str = str.substr(0, str.length - 3);
        connection.query(str, moziire, function(err, re) {
          if(err || re[0] == []){flag++; return  "検索結果がありません";}
          for(var i = 0; i < res.length; i++) {
            comment.push(res[i])
          }
          for(var j = 0; j < re.length; j++) {
            title.push(re[j])
          }
          0 < flag ? kenkensaku() : flag++;
          /* res[num].comment でコメント, res[num].urlId でURLID
          re[num].title でタイトル, re[num].id でURLID */
          unko(result)
        })
      });
    });
  }

  module.exports = kensaku;
