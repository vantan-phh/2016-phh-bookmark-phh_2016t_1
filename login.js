var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 database : `bookmark`
});

var app = express();

app.engine('ejs',ejs.renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('public'));

app.post('/register', function (req, res) {
  if (req.body.username && req.body.password) {
    res.render('./register.confirm.ejs',
      {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
      }
    );
    connection.query(
      "INSERT INTO `users` (`username`, `password`, `name`) VALUES (?, ?, ?)",
      [req.body.username, req.body.password, req.body.name],
    function(error, result, fields){
      console.log(result);
    });
  } else {
    res.redirect('/static/register.html');
  }
});

app.post('/login', function (req, res) {
  if (req.body.username && req.body.password) {
    var name, id;
    var result = connection.query(
      'SELECT `id`, `name` FROM users WHERE `username` = ? AND `password` = ?',
      [req.body.username, req.body.password],
      function(error, result, fields){
        if (result[0]) {
          id = result[0].id;
          name = result[0].name;
          res.render('./login.ejs',
            {
              u_id: id,
              u_name: name
            }
          );
        }
      }
    );
  } else {
    res.redirect('/static/login.html');
  }
});

app.listen(3000)
