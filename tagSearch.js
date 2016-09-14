var connection = require('./connection');

function tagSearch(userId, tagName) {
  return new Promise((resolve, reject) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT `orgId` FROM `joiningOrgs` WHERE userId = ?', [userId],
      function(err, sqlResult){
        try{
          var result = {};
          if(err) throw err;
          if(sqlResult[0] === undefined) throw new Error('select empty');
          result.first = sqlResult;
          resolve(result);
        }catch(e) {
          reject(e);
        }
      });
    }).then(result => new Promise((resolve, reject) => {
      connection.query('SELECT `id` FROM `tag` WHERE `tagName`=?', [tagName],
      function(err, sqlResult){
        try {
          if(err) throw err;
          if(sqlResult[0] === undefined) throw new Error('tag empty')
          result.second = sqlResult;
          resolve(result);
        }catch(e) {
          reject(e);
        }
      });
    })).then(result => new Promise((resolve, reject) => {
      var ary = [result.second[0].id]
      var str = "SELECT `urlId` FROM `urlTag` WHERE `tagId` = ? AND (";
      for(var i = 0; i < result.first.length; i++) {
        str += "`orgId` = ? OR ";
        ary[i + 1] = result.first[i].orgId;
      }
      str = str.substr(0, str.length - 4);
      str += ")";
      connection.query(str, ary, function(err, res) {
        try {
          if(err) throw err;
          if(res[0] === undefined) throw new Error('ふげぇ')
          resolve(res);
        }catch(e) {
          reject(e);
        }
      })
    })).then(result => {
      resolve(result);
    })
  })
}
