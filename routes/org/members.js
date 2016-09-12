var express = require('express');
var router = express.Router();
var connection = require('../../connection');
var common = require('../../common');
var com = new common(connection);

router.get('/:id(\\d+)/members', function (req, res) {
  var orgInfo;
  var perm;
  var orgId = req.params.id;
  Promise.all([
    com.orgInfo([orgId]), com.orgMembers(orgId), com.orgPermissions(orgId)
  ]).then(function (vals) { // vals[0]: orgInfo, vals[1]: orgMem
    orgInfo = vals[0][0];
    var userIds = vals[1];
    perm = vals[2];
    return com.userInfo(userIds);
  }).then(function (userInfos) {
    for (var i = 0; i < userInfos.length; i++) {
      for (var j = 0; j < perm.length; j++) {
        if (userInfos[i].id == perm[j].userId) {
          userInfos[i].permission = perm[j].permission;
          break;
        }
      }
    }
    console.log(userInfos);
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
