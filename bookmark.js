var express = require('express');
var ejs = require('ejs');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('../views/bookmark.ejs',{
    header:`<header>
    <div class="header-left">
    <h2>PHHブックマークver0.1</h2>
    </div>
    <div class="header-right">
    <ul>
    <li>ログイン</li>
    <li>ログアウト</li>
    <li>新規登録</li>
    </ul>
    </div>
    </header>
    <style>
    header{
      height:60px;
      border-bottom:1px solid #A9A9A9;
    }
    .header-left{
      float:left;
    }
    .header-left h2{
      font-weight:100;
    }
    .header-right{
      float:right;
    }
    .header-right li{
      float:left;
      padding: 5px 10px;
      border-left: 1px solid  #A9A9A9;
      list-style:none;
    }
    </style>`
  })
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
