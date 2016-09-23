var express = require('express');
var connection = require('../connection');
var common = require('../common');
var router = express.Router();

var com = new common(connection);

router.get('/:name(\\w+)', function (req, res) {
  var name = req.params.name;
  var ids = [];
  console.log(name);
  connection.query("SELECT id FROM users WHERE `name` LIKE ? LIMIT 5", [`${name}%`], function (error, result) {
    for (var r of result) {
      console.log(r);
      ids.push(r.id);
    }
    com.userInfo(ids).then(function (users) {
      users.sort((a,b) => {
        if (a.name>b.name) return -1;
        if (a.name<b.name) return 1;
        return 0;
      });
      res.json(users);
    })
  });
});

module.exports = router;
