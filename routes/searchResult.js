var express = require('express');
var router = express.Router();

/*
// serch機能
var mysql = require('mysql');
var mysql = mysql.createConnection({
host : "localhost",
user : "root",
database : "bookmark"
});

mysql.connect(function(err) {
if(err){
console.error("データベースに接続できません");
return;
}
});
*/
/*
function kensaku(id, kenmozi) {
mysql.query('SELECT `org_id` FROM `joiningOrgs` WHERE user_id = ?', [id],
function(err, result) {
if(err)return;
var strC = 'SELECT `comment`, `urlId` FROM `orgComments` WHERE'
var moziire = [];
for(i = 0; i < result.length; i++) {
strC += (" comment LIKE ?  AND orgId = " + result[i].org_id + " OR");
moziire.push(kenmozi);
}
strC = strC.substr(0, strC.length - 3);
mysql.query(strC, moziire, function(err, res){
if(err)return;
var str = 'SELECT `title`, `id` FROM `urls` WHERE'
moziire = [];
titleId = [];
for(var i = 0; i < res.length; i++) {
str += (" title LIKE ? AND id = " + res[i].urlId + " OR");
moziire.push(kenmozi);
}
str = str.substr(0, str.length - 3);
mysql.query(str, moziire, function(err, re) {
if(err)return;
// res[num].comment でコメント, res[num].urlId でURLID
// re[num].title
})
});
});
}
kensaku(1, "%ほ%");
*/

router.post('/', function (req, res) {
  var searchWord = req.body.serachWord;
  res.send(searchWord);
  console.log(searchWord);
});
module.exports = router;
