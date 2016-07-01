var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root',
 database : `phh_test_bkm_1`
});

var app = express();

app.engine('ejs',ejs.renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { //cookieのデフォルト内容
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60 * 1000// ★★修正箇所：1 hour. ここを指定しないと、ブラウザデフォルト(ブラウザを終了したらクッキーが消滅する)になる こちらはms
  }
}));
app.use('/static', express.static('public'));

app.get('/', function (req, res) {
  if (req.session.uid) {
    // Do not redirect loop
    // res.redirect('/');
    console.log("topp");
    res.send('You are ' + req.session.uname + '\nYou are ' + req.session.uid);
  } else {
    res.redirect('/login');
  }
})

app.get('/register', function (req, res) {
  res.render('./register.ejs',
    {
      warn: ""
    }
  );
});
app.post('/register', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;
  console.log(username, password, name);
  connection.query('SELECT * FROM `users` WHERE `username` = ? LIMIT 1', [username], function (error, result, fields) {
    var usernameExists = result.length === 1;
    if (!usernameExists) {
      if (username && password && name) {
        res.render('./register.confirm.ejs',
          {
            username: username,
            password: password,
            name: name
          }
        );
        connection.query(
          "INSERT INTO `users` (`username`, `password`, `name`) VALUES (?, ?, ?)",
          [username, password, name],
        function(error, result, fields){
          console.log(result);
        });
      } else {
        res.render('./register.ejs',
          {
            warn: "全て入力してください"
          }
        );
      }
    } else {
      res.render('./register.ejs',
        {
          warn: "既に存在しているusernameです"
        }
      );
    }
  });
});

app.get('/login', function (req, res) {
  res.render('./login.ejs');
});
app.post('/login', function (req, res) {
  if (req.body.username && req.body.password) {
    var name, id;
    connection.query(
      'SELECT `id`, `name` FROM `users` WHERE `username` = ? AND `password` = ?',
      [req.body.username, req.body.password],
      function (error, result, fields) {
        console.log(result);
        if (result.length === 1) {
          var uid = result[0].id;
          var uname = result[0].name;
        } else {
          var uid = false;
          var uname = false;
        }
        if (uid && uname) {
          console.log(uid);
          req.session.uid = uid;
          req.session.uname = uname;
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      }
    );
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});

app.listen(3000)
