//データベースに接続
var mysql = require("mysql");
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
  var image,
  title,
  description;

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
create("http://www.backlog.jp/git-guide/stepup/stepup2_3.html");
