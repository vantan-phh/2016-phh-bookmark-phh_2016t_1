//データベースに接続
var mysql = require('mysql');
var mysql = mysql.createConnection({
  host : "localhost",
  user : "root",
  database : "bookmark"
});

//接続失敗時のエラー処理
mysql.connect(function(err) {
  if(err){
    console.error("データベースに接続できません");
    return;
  }
});

function create(url) {
  var superResult;
  //http通信のためのインスタンス化
  var client = require('cheerio-httpcli');
  //既に同じURLが入っていないか検証する
  mysql.query(
    "SELECT `url` FROM `urls`",
    //resultに取得した内容、fieldにステータス？が入る
    function(err, result, field){
      if(err){
        return "現在URLを追加することができません";
      }
      result = String(result);
      if(result.match(url)){
        return "このURLは既に存在しています";
      }
    }
  );
  var image, title, description;

  //タイトルとか取得
  var urlSync = client.fetchSync(url);
  urlSync.$("meta[property='og:description']").each(function(){
    description = urlSync.$(this).attr("content");
  });
  if(!description){
    urlSync.$("meta[name=description]").each(function(){
      description = urlSync.$(this).attr("content");
    });
  }
  urlSync.$("meta[property='og:title']").each(function(){
    title = urlSync.$(this).attr("content");
  });
  if(!title){
    urlSync.$("meta[name=title]").each(function(){
      title = urlSync.$(this).attr("content");
    });
  }
  if(!title){
    title = urlSync.$("title").text();
  }
  urlSync.$("meta[property='og:image']").each(function(){
    image = urlSync.$(this).attr("content");
  });
  if(image){
    urlSync.$("meta[name=image]").each(function(){
      image = $(this).attr("content");
    });
  }
  if(!image){image = "No image"};
  if(!title){title = "No title"};
  if(!description){description = "No description"};

  //URLやそれが持つデータをを追加
  mysql.query("INSERT INTO `urls`(`url`, `title`, `description`, image) VALUES(?, ?, ?, ?);",
  [url, title, description, image]);
}

//create("http://www.backlog.jp/git-guide/stepup/stepup2_3.html");


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.engine('ejs',ejs.renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static('public'));

app.get('/', function (req, res) {
  res.render('./bookmark.ejs',{
    name: "userName"
  })
});

app.post('/', function (req, res) {
  res.send("aa");
  console.log(req.body.url); // req.IncomingMessage.body
});

app.use('/static', express.static('test'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
