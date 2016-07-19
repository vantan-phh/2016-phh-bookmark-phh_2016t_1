var express = require('express');
var router = express.Router();
var sha256gen = require('../sha256gen');
var mysql = require('mysql');
var connection = require('../connection');
var client = require('cheerio-httpcli');

function create(url, comment, userId) {
  var superResult;
  var urlId;
  //http通信のためのインスタンス化
  var client = require('cheerio-httpcli');
  //既に同じURLが入っていないか検証する
  new Promise(function (resolve, reject) {
    connection.query(
      "SELECT `url` FROM `urls`",
      //resultに取得した内容、fieldにステータス？が入る
      function(err, result, field){
        if(err){
          console.log("現在URLを追加することができません");
          return "現在URLを追加することができません";
        }
        console.log(result);
        result = String(result);
        console.log(result);
        if(result.match(url)){
          console.log("このURLは既に存在しています");
          return "このURLは既に存在しています";
        }
        console.log("resolve");
        resolve();
      }
    );
  }).then(function () {
    //////////////////////////////////////////////////////////////////////////////
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
    urlSync.$("meta[property='og:image']").each( function(){
      image = urlSync.$(this).attr("content");
    });
    if(image){
      urlSync.$("meta[name=image]").each( function(){
        image = $(this).attr("content");
      });
    }
    if(!image){image = "No image"};
    if(!title){title = "No title"};
    if(!description){description = "No description"};

    //URLやそれが持つデータをを追加
    return new Promise(function (resolve, reject) {
      connection.query("INSERT INTO `urls` (`url`, `title`, `description`, `image`) VALUES(?, ?, ?, ?)",
        [url, title, description, image], function (error, result, fields) {
          if (!result) {
            console.log(error);
            return 1;
          }
          urlId = result.insertId;
          console.log(result.insertId);
          console.log("resolve");
          console.log(urlId);
          resolve();
      })
    });
  }).then(function () {
    console.log("aaa");
    console.log(userId, urlId, comment, "aaa");
    connection.query("INSERT INTO `user_url` (`userId`, `urlId`, `comment`) VALUES(?, ?, ?)",
      [userId, urlId, comment], function (error, result, fields) {
        console.log(userId, urlId, comment);
    });
  })
}

router.post('/', function (req, res) {
  if (req.session.userId && req.session.userName) {
    var userName = req.session.userName;
    var userId = req.session.userId;
    var url = req.body.url;
    var comment = req.body.comment;
    create(url, comment, userId);
  } else {
    // res.redirect('/login');
  }
});

module.exports = router;
