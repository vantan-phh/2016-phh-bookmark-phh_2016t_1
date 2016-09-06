var express = require('express');
var router = express.Router();
var connection = require('../../connection');
var common = require('../../common');
var com = new common(connection);

router.get('/:id(\\d+)/members', function (req, res) {
  var orgId = req.params.id;
  com.orgMembers(orgId).then(function (userIds) {
    console.log(userIds);
    return com.userInfo(userIds);
  }).then(function (userInfos) {
    console.log(userInfos[0]);
    res.render('./members.ejs', {
      users: userInfos
    });
  });
});

module.exports = router;
