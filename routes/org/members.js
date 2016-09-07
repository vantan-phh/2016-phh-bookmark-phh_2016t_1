var express = require('express');
var router = express.Router();
var connection = require('../../connection');
var common = require('../../common');
var com = new common(connection);

router.get('/:id(\\d+)/members', function (req, res) {
  var orgInfo;
  var orgId = req.params.id;
  Promise.all([
    com.orgInfo(orgId), com.orgMembers(orgId)
  ]).then(function (vals) { // vals[0]: orgInfo, vals[1]: orgMem
    orgInfo = vals[0];
    var userIds = vals[1];
    console.log(orgInfo, userIds);
    return com.userInfo(userIds);
  }).then(function (userInfos) {
    res.render('./members.ejs', {
      users: userInfos,
      org: orgInfo
    });
  });
});

module.exports = router;

// com.orgMembers(orgId).then(function (userIds) {
//   console.log(userIds);
//   return com.userInfo(userIds);
// })
