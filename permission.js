var connection = require('./connection');
//orgIdに存在するuserIdに権限を与える関数
function distribution (orgId, userId) {
  connection.query("UPDATE joiningOrgs SET permission = 2 WHERE orgId = ? AND userId = ?",[orgId, userId], function(err) {if(err)console.log(err)})
}
