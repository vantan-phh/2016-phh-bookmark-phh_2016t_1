var crypto = require('crypto');
function sha256gen(str) {
  var hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}

var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : `bookmark`
});

var app = express();

app.use(logger('dev'));

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
app.use('/setting/icon', routes.icon);

app.use('/icon', routes.iconfile);

app.use('/createorg', routes.createorg);
app.use('/search', routes.search);
app.use('/joiningOrgs', routes.joiningOrgs);


app.use('/org', routes.members);

app.use('/entry', routes.entry);
app.use('/orglist', routes.orglist);

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});
app.use('/create', routes.create);
app.use('/contents', routes.contents);
app.use('/delete', routes.delete);
app.use('/createorg', routes.createorg);
app.use('/org', routes.org);
app.use('/searchResult', routes.searchResult);

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
