//データベースに接続
var mysql = require("mysql");
var mysql = mysql.createConnection({
  host : "localhost",
  user : "root",
  database : "tool"
});

//接続失敗時のエラー処理
mysql.connect(function(err) {
  if(err){
    console.error("データベースに接続できません");
    return;
  }
});

//新しいURLを追加するときの関数
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
  urlSync.$("meta[name=description]").each(function(idx){
    description = urlSync.$(this).attr("content");
  });
  urlSync.$("meta[property='og:description']").each(function(idx){
    description = urlSync.$(this).attr("content");
  });
  title = urlSync.$("title").text();
  urlSync.$("meta[name=title]").each(function(idx){
    title = urlSync.$(this).attr("content");
  });
  urlSync.$("meta[property='og:title']").each(function(idx){
    title = urlSync.$(this).attr("content");
  });
  urlSync.$("meta[name=image]").each(function(idx){
    image = $(this).attr("content");
  });
  urlSync.$("meta[property='og:image']").each(function(idx){
    image = urlSync.$(this).attr("content");
  });
  if(!image){image = "No image"};
  if(!title){title = "No title"};
  if(!description){description = "No description"};

  //URLやそれが持つデータをを追加
  mysql.query("INSERT INTO `urls`(`url`, `title`, `description`, image) VALUES(?, ?, ?, ?);",
  [url, title, description, image]);
}
create(ここにURLを突っ込む);
