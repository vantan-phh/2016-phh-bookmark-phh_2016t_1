var connection = require('./connection');

function kensaku(id, kenmozi) {
  return new Promise( (resolve, reject) => {
    kenmozi = kenmozi.trim();
    var flag = 0;
    for(var i = 0; i < kenmozi.length; i++) {
      if(kenmozi[i] == /\s/) {
        flag ? (kenmozi.splice(i, 1), i--) : flag = 1;
      }else {
        flag = 0;
      }
    }
    kenmo = kenmozi.split(" ");
    sosikikensaku(id, "'%" + kenmo[0] + "%'").then(function(kekka) {
      if(kenmo[1]) {
        for(var i = 0; i < kekka.length; i++) {
          kekka[i].hyouka = 0;
          for(var j = 1; j < kenmo.length; j++) {
            if(kekka[i].title) {
              if(kekka[i].title.match(kenmo[j])) {
                kekka[i].hyouka += 1 + (kenmo.length - j)/10;
              }
            }else {
              if(kekka[i].comment.match(kenmo[j])) {
                kekka[i].hyouka += 1 + (kenmo.length - j)/10;
              }
            }
          }
        }
        kekka = kekka.sort(function(a, b){
          if (a.hyouka > b.hyouka) return 1;
          if (a.hyouka < b.hyouka) return -1;
          return 0;
        });
      }
      resolve(kekka);
    })
  }
}
function sosikikensaku(id, kenmozi) {
  return new Promise( (resolve, reject) => {
    connection.query('SELECT `orgId` FROM `joiningOrgs` WHERE userId = ?', [id],
    function(err, result) {
      if(err || result[0] == undefined)return "not found";
      var str = 'SELECT `comment`, `urlId`, `userId` FROM `orgComments` WHERE ';
      for(var i = 0; i < result.length; i++) {
        str += "orgId = " + result[i].orgId + " OR "
      }
      str = str.substr(0, str.length - 4);
      connection.query(str, function(err, res){
        if(err)return "not found";
        var str = 'SELECT `title`, `id` FROM `urls` WHERE (title LIKE ' + kenmozi + ") AND ("
        for(var i = 0; i < res.length; i++) {
          str += "id = " + res[i].urlId + " OR ";
        }
        str = str.substr(0, str.length - 4);
        str += ")";
        connection.query(str, function(err, re) {
          if(err)return "not found";
          if(re[0] == res[0])return "not found";
          var comment = [];
          for(var i = 0; i < res.length; i++) {
            if(res[i].comment.match(kenmo[0])) {
              comment.push(res[i]);
            }
          }
          var kekka = re.concat(comment);
          resolve(kekka);
        });
      });
    });
  });
}

module.exports = kensaku;
