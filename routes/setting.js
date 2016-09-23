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

function nameQuery(name, userId) {
  return new Promise( (resolve, reject) => {
    queryPromise("SELECT COUNT(name) AS `count` FROM users WHERE `name` = ?", [name])
    .then((result) => {
      if (result[0].count == 0) {
        connection.query( "UPDATE `users` SET `name` = ?, `time_updated` = ? WHERE id = ?", [name, +new Date(), userId],
          function (error, result, fields) {
            console.log(result);
            if (result) resolve(result);
            if (error) {
              console.log(error);
              reject(error)
            };
          }
        );
      } else {
        reject("name duplicate");
      }
    })
  });
}

function emailQuery(email, userId) {
  return new Promise( (resolve, reject) => {
    queryPromise("SELECT COUNT(email) AS `count` FROM users WHERE `email` = ?", [email])
    .then((result) => {
      if (result[0].count == 0) {
        connection.query( "UPDATE `users` SET `name` = ?, `time_updated` = ? WHERE id = ?", [email, +new Date(), userId],
          function (error, result, fields) {
            console.log(result);
            if (result) resolve(result);
            if (error) {
              console.log(error);
              reject(error)
            };
          }
        );
      } else {
        reject("email duplicate");
      }
    })
  });
}

router.get('/', function (req, res) {
  var warn = "";
  res.render('./setting.ejs');
});

router.post('/', function (req, res) {
  var userId = req.session.userId;
  var displayName = req.body.displayName;
  var name = req.body.name;
  var email = req.body.email;
  var newpassword = req.body.newpassword;
  var password = req.body.password;
  if (newpassword) {
    newpassword = sha256gen(req.body.newpassword);
  }
  var password = sha256gen(req.body.password);
  var promiseArr = [];
  queryPromise(
    "SELECT `password` FROM users WHERE id = ?", [userId]
  ).then((result) => {
    if (password === result[0].password) {
      if (displayName) promiseArr.push(["UPDATE `users` SET `displayName` = ?, `time_updated` = ? WHERE id = ?", [displayName, +new Date(), userId]]);
      if (name) promiseArr.push(["name"]);
      if (email) promiseArr.push(["email"]);
      if (newpassword) promiseArr.push(["UPDATE `users` SET `password` = ?, `time_updated` = ? WHERE id = ?", [newpassword, +new Date(), userId]]);
      Promise.all(promiseArr.map((arr) => {
        if (arr[0] == "name") {
          return nameQuery(name, userId);
        } else if (arr[0] == "email") {
          return emailQuery(email, userId);
        }
        return queryPromise(arr[0], arr[1])
      })).then(() => {
        console.log("success");
        res.status(200).send("success");
      }).catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
      });
    } else {
      res.status(400).send("Password Wrong");
    }
  });
});

module.exports = router;
