var sha256gen = require('../sha256gen');
var express = require('express');
var router = express.Router();
var connection = require('../connection');

function queryPromise(sqlstr, array) {
  console.log(sqlstr);
  return new Promise( (resolve, reject) => {
    connection.query( sqlstr, array,
      function (error, result, fields) {
        console.log(result);
        if (result) resolve(result);
        if (error) {
          console.log(error);
          reject(error)
        };
      }
    );
  });
}

router.get('/', function (req, res) {
  var warn = "";
  res.render('./setting.ejs', {
    warn: warn,
  });
});

router.post('/', function (req, res) {
  var userId = req.session.userId;
  var displayName = req.body.displayName;
  var name = req.body.name;
  var email = req.body.email;
  var password = sha256gen(req.body.password);
  var promiseArr = [];
  if (displayName) promiseArr.push(["UPDATE `users` SET `displayName` = ?, `time_updated` = ? WHERE id = ?", [displayName, +new Date(), userId]]);
  if (name) promiseArr.push(["UPDATE `users` SET `name` = ?, `time_updated` = ? WHERE id = ?", [name, +new Date(), userId]]);
  if (email) promiseArr.push(["UPDATE `users` SET `email` = ?, `time_updated` = ? WHERE id = ?", [email, +new Date(), userId]]);
  if (password) promiseArr.push(["UPDATE `users` SET `password` = ?, `time_updated` = ? WHERE id = ?", [password, +new Date(), userId]]);
  Promise.all(promiseArr.map((arr) => {return queryPromise(arr[0], arr[1])})).then(() => {
    console.log("success");
    res.status(200).send("success");
  }).catch((error) => {
    console.log(error);
    res.status(500).send("Internal Server Error");
  });
});

module.exports = router;
