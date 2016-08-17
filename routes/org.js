// データベースから情報を出してやるぞテスト
var express = require('express');
var connection = require('../connection');
var router = express.Router();

router.get('/:id(\\d+)', function (req, res) {
  connection.query(
    "SELECT * FROM `orgs` WHERE `id` = ?",
    [req.params.id],
    function (err, result, field) {
      var result = result[0];
      res.send(`name: ${result.name}</br>description: ${result.description}`);
    }
  );
});

module.exports = router;
