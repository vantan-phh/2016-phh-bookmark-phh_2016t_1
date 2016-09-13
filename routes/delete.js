var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var connection = require('../connection');

function deleteCommentPromise(commentId, userId) {
  return new Promise(function (resolve, reject) {
    connection.query(
      "DELETE FROM `orgComments` WHERE `id` = ? AND `userId` = ?",
      [commentId, userId],
      function (err, result, filed) {
        try {
          if (err) {
            console.log(err);
            throw new Error(err.code);
          }
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    );
  })
}

router.post('/', function (req, res) {
  if (req.session.userId) {
    var userId = req.session.userId;
    var commentId = req.body.commentId;
    deleteCommentPromise(commentId, userId)
    .then(function(result){
      res.sendStatus(200);
    }).catch(function (e) {
      console.dir(e);
      res.sendStatus(400);
    });
  }
});

module.exports = router;
