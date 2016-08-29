var connection = require('./connection');
//orgIdに存在するuserIdに権限を与える関数
function distribution (orgId userId) {
  connection.query("UPDATE joiningOrgs SET permission = 1", function(err)console.log("権利を渡せませんでした");)
}
