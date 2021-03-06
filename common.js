"use strict"
class Common {
  constructor(connection) {
    this.connection = connection;
  }

  isJoiningOrg(userId, orgId) { // 組織にその人がいるかどうかを返す
    return new Promise( (resolve, reject) => { // thisを束縛するためアロー関数をつかった
      this.connection.query(
        "SELECT `*` FROM `joiningOrgs` WHERE userId = ? AND orgId = ?",
        [userId, orgId],
        function (error, result, fields) {
          result = !!result.length; //trueかfalseかで返す
          resolve(result);
        }
      );
    });
  }

  userInfo(userIds) {
    return new Promise( (resolve, reject) => { // thisを束縛するためアロー関数をつかった
      var sqlstr = "SELECT `*` FROM `users` WHERE id = ?";
      for (var i = 1; i < userIds.length; i++) sqlstr += " OR id = ?";
      this.connection.query(
        sqlstr, userIds,
        function (error, result, fields) {
          resolve(result);
        }
      );
    });
  }

  orgInfo(orgIds) {
    return new Promise( (resolve, reject) => {
      var sqlstr = "SELECT `*` FROM `orgs` WHERE id = ?";
      for (var i = 1; i < orgIds.length; i++) sqlstr += " OR id = ?";
      console.log(sqlstr);
      this.connection.query(
        sqlstr, orgIds,
        function (error, result, fields) {
          resolve(result);
        }
      );
    });
  }

  orgPermissions(orgId) {
    return new Promise( (resolve, reject) => {
      this.connection.query(
        "SELECT `userId`, `permission` FROM `joiningOrgs` WHERE orgId = ?", [orgId],
        function (error, result, fields) {
          resolve(result);
        }
      );
    });
  }

  joiningOrgs(userId) {
    return new Promise( (resolve, reject) => {
      this.connection.query(
        "SELECT `orgId` FROM `joiningOrgs` WHERE userId = ?",
        [userId],
        function (error, result, fields) {
          var orgIds = result.map(r => r.orgId);
          orgIds = orgIds.sort((a, b) => (a < b ? -1 : 1));
          resolve(orgIds);
        }
      );
    });
  }

  orgMembers(orgId) {
    return new Promise( (resolve, reject) => {
      this.connection.query(
        "SELECT `userId` FROM `joiningOrgs` WHERE orgId = ?",
        [orgId],
        function (error, result, fields) {
          var userIds = result.map(r => r.userId);
          userIds = userIds.sort((a, b) => (a < b ? -1 : 1));
          resolve(userIds);
        }
      );
    });
  }

}

module.exports = Common;
