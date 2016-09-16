var connection = require('./connection');

function kensaku(id, kenmozi) {
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
    kenmo = kenmozi.split(" ");
    sosikikensaku(id, "%" + kenmo[0] + "%").then(function(kekka) {
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
      resolve(kekka);
    },function(err) {
      reject(err);
    })
  })
}
function sosikikensaku(id, kenmozi) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT `orgId` FROM `joiningOrgs` WHERE userId = ?', [id],
    function(err, Qresult) {
      try {
        if(err)throw err;
        if(Qresult[0] == undefined)throw Qresult[0];
        var result = {first: Qresult};
        resolve(result);
      }catch(e) {
        reject(e);
      }
    })
  }).then(result => new Promise((resolve, reject) => {
    var str = 'SELECT * FROM `orgComments` WHERE ';
    var ary = [];
    for(var i = 0; i < result.first.length; i++) {
      str += "orgId = ? OR ";
      ary.push(result.first[i].orgId);
    }
    str = str.substr(0, str.length - 4);
    connection.query(str, ary, function(err, Qresult){
      try {
        if(err)throw err;
        result.second = Qresult;
        resolve(result);
      }catch(e) {
        reject(e);
      }
    })
  })).then(result => new Promise((resolve, reject) => {
    var ary = [kenmozi];
    var str = "SELECT `title`, `id` FROM `urls` WHERE (title LIKE ? ) AND ("
    for(var i = 0; i < result.second.length; i++) {
      str += "id = ? OR ";
      ary.push(result.second[i].urlId);
    }
    str = str.substr(0, str.length - 4);
    str += ")";
    connection.query(str, ary, function(err, Qresult) {
      try {
        if(err)throw err;
        if(result.second[0]) {
          var comment = [];
          for(var i = 0; i < result.second.length; i++) {
            if(result.second[i].comment.match(kenmo[0])) {
              comment.push(result.second[i]);
            }
          }
        }
        if(Qresult[0]) {
          for(var i = 0; i < Qresult.length; i++) {
            for(var j = 0; j < result.second.length; j++) {
              if(Qresult[i].id == result.second[j].urlId) {
                Qresult[i].orgId = result.second[j].orgId;
                break;
              }
            }
          }
        }
        if(Qresult[0] == comment[0])throw err;
        var kekka = Qresult && comment[0] ? Qresult.concat(comment) :
        Qresult && !comment[0] ? Qresult : comment;
        resolve(kekka);
      }catch(e) {
        reject(e);
      }
    })
  }))
}

module.exports = kensaku;
