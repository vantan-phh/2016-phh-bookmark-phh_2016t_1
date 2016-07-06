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
    //クエリ
    "SELECT `url` FROM `urls`",
    //resultに取得した内容、fieldにステータス？が入る
    function(err, result, field){
      if(err){
        return "現在URLを追加することができません";
      }
      result = String(result);
      if(result.match(url)){
        //ここで更新しても良いかも
        return "このURLは既に存在しています";
      }
    }
  );
  var image = "No image"
  var title = "No title"
  var description = "No description"
  client.fetch(url, function (err, $, res, body){
    if($("meta[property=og:description]")){
      $("meta[property=og:description]").each(function(idx){
        if($(this).attr("content")){
          description = $(this).attr("content");
       }
      });
    }
    if($("meta[name=description]")){
      if(description = "No description"){
        $("meta[name=description]").each(function(idx){
          if($(this)){
            description = $(this).attr("content");
          }
        });
      }
    }
    if($("meta[property=og:title]")){
      $("meta[property=og:title]").each(function(idx){
        if($(this)){
          title = $(this).attr("content");
        }
      });
    }
    if($("meta[name=title]")){
      if(title = "No title"){
        $("meta[name=title]").each(function(idx){
          if($(this)){
            title = $(this).attr("content");
          }
        });
      }
    }
    if($("title")){
      if(title = "No title"){
        title = $("title").text();
      }
    }
    if($("meta[property=og:image]")){
      $("meta[property=og:image]").each(function(idx){
        if(($this).attr("content")){
          image = $(this).attr("content");
        }
      });
    }
    if($("meta[name=image]")){
      if(image = "No image"){
        $("meta[name=image]").each(function(idx){
          if(($this).attr("content")){
            image = $(this).attr("content");
          }
        });
      }
    }
  });

  //URLやそれが持つデータをを追加
  mysql.query("INSERT INTO `urls`(`url`, `title`, `description`, image) VALUES(?, ?, ?, ?);",
  [url, title, description, image]);
}
create("http://gihyo.jp/dev/serial/01/crossbrowser-javascript/0012");
