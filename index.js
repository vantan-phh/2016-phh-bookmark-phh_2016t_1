var crypto = require('crypto');
function sha256gen(str) {
  var hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}

var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : `bookmark`
});

var app = express();

app.engine('ejs', ejs.renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { //cookieのデフォルト内容
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

var routes = require('./routes');

app.use('/static', express.static('public'));
app.use('/', routes.top);
app.use('/register', routes.register);
app.use('/login', routes.login);
app.use('/setting', routes.setting);
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});
app.use('/create', routes.create);

app.listen(3000);
