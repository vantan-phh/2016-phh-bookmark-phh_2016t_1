var express = require('express');
var connection = require('../../connection');
var router = express.Router();

router.get('/:id(\\d+)', function (req, res) {
  var orgId = req.params.id;
  connection.query(
    "SELECT * FROM `orgs` WHERE `id` = ?",
    [orgId],
    function (err, result, field) {
      var result = result[0];
      var orgName = result.name;
      //res.send(`name: ${result.name}</br>description: ${result.description}`);
      res.render('./org.ejs',
        {
          orgName: orgName,
          orgId : orgId
        }
      );
    }
  );
});

module.exports = router;
