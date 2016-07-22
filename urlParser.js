function urlParser(url) {
  if (url) {
    
  }
  var client = require('cheerio-httpcli');
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
  if(!image){
    urlSync.$("meta[name=image]").each( function(){
      image = $(this).attr("content");
    });
  }
  if(!image){image = "No image"};
  if(!title){title = "No title"};
  if(!description){description = "No description"};

  return [title, description, image];
}

module.exports = urlParser;
