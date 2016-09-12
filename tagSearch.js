var connection = require('./connection');

function tagSearch(userId, tagName) {
  return new Promise( (resolve, reject) => {
    connection.query("SELECT `orgId` FROM `joiningOrgs` WHERE userId = " + userId,
    function(err, result) {
      if(err || result[0] == undefined)return "検索失敗"
      connection.query("SELECT `id` FROM `tag` WHERE `tagName` = '" + tagName + "'",
      function(err, res) {
        if(err || res[0] == undefined)return "検索失敗"
        str = "SELECT `urlId` FROM `urlTag` WHERE `tagId` = " + res[0].id + " AND (";
        for(var i = 0; i < result.length; i++) {
          str += "`orgId` = " + result[i].orgId + " OR ";
        }
        str = str.substr(0, str.length - 4);
        str += ")";
        connection.query(str, function(err, res) {
          if(err || res[0] == undefined)return "検索失敗"
          resolve(res);
        });
      });
    });
  });
}
