var connection = require('./connection');

function tagProduction(tagName, urlId, orgId) {
  return new Promise((resolve, reject) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT `id` FROM `tag` WHERE tagName = ?", [tagName],
      function(err, result) {
        try {
          var Result = {};
          if(err) throw err;
          if(result[0]) {
            Result.first = result[0].id;
          }
          resolve(Result);
        }catch(err) {
          reject(err);
        }
      });
    }).then(Result => new Promise((resolve, reject) => {
      if(Result.first === undefined) {
        connection.query("INSERT INTO tag(tagName) values(?)", [tagName],
        function(err, res) {
          try {
            if(err) throw err;
            Result.second = res.insertId;
            resolve(Result);
          }catch(err) {
            reject(err);
          }
        })
      }else {
        connection.query("SELECT `id` FROM `urlTag` WHERE urlId = ? AND tagId = ? AND orgId = ?",
        [urlId, Result.first, orgId],function(err, res) {
          try {
            if(err) throw err;
            if(res[0] !== undefined) {
              Result.ans = res[0].id;
            }else {
              Result.second = Result.first;
            }
            resolve(Result);
          }catch(err) {
            reject(err);
          }
        })
      }
    }),function(err) {
      reject(err);
    }).then(Result => new Promise((resolve, reject) => {
      if(Result.second) {
        connection.query("INSERT INTO urlTag(urlId, tagId, orgId) values(?, ?, ?)",
        [urlId, Result.second, orgId],function(err, res) {
          try {
            if(err) throw err;
            resolve(res.insertId);
          }catch(err) {
            reject(err);
          }
        });
      }else {
        resolve(Result.ans);
      }
    }),function(err) {
      reject(err);
    }).then(result => {
      resolve(result);
    })
  })
};
module.exports = tagProduction;
