var connection = require('./connection');

function tagProduction(tagName, urlId, orgId) {
  return new Promise( (resolve, reject) => {
    connection.query("SELECT `id` FROM `tag` WHERE tagName = '?'", [tagName]
    function(err, result) {
      if(err)return "タグ生成失敗";
      if(result[0] == undefined) {
        connection.query("INSERT INTO tag(tagName) values('?')", [tagName],
        function(err, res) {
          if(err)return "タグ生成失敗"
          connection.query("SELECT `id` FROM tag WHERE tagName = '?'", [tagName],
          function(err, re) {
            if(err)return "タグ生成失敗"
            connection.query("INSERT INTO urlTag(urlId, tagId, orgId) values(?, ?, ?)", [urlId, re[0].id, orgId],
            function(err, res) {
              if(err)return "タグ生成失敗"
              connection.query("SELECT `id` FROM urlTag WHERE urlId = ? AND tagId = ? AND orgId = ?", [urlId, re[0].id, orgId],
              function(err, res) {
                resolve(res[0].id);
              });
            });
          });
        });
      }else {
        connection.query("SELECT `id` FROM `urlTag` WHERE urlId = ? AND tagId = ? AND orgId = ?", [urlId, result[0].id, orgId],
        function(err, res) {
          if(err)return "タグ生成失敗"
          if(res[0] == undefined) {
            connection.query("INSERT INTO urlTag(urlId, tagId, orgId) values(?, ?, ?)", [urlId, result[0].id, orgId],
            function(err, res) {
              if(err)return "タグ生成失敗"
              connection.query("SELECT `id` FROM urlTag WHERE urlId = ? AND tagId = ? AND orgId = ?", [urlId, result[0].id, orgId],
              function(err, res) {
                if(err)return "タグ生成失敗";
                resolve(res[0].id);
              });
            });
          }else {
            resolve(res[0].id);
          }
        });
      }
    });
  });
};
