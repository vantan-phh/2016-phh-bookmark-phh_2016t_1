var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('./setting.ejs',{
  });
});
/*
router.post('/', function (req, res) {
  var userName = req.body.userName;
  var email = req.body.email;
  var password = req.body.password;
  //console.log(userName);
)};
*/

module.exports = router;
