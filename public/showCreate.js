$(function(){

  $.ajax({
    url:'/contents',
    type: 'POST',
    success: function(res) {
      obj = JSON.parse(res);
      //console.dir(obj);
      //console.log(JSON.parse(res).length);
      obj.sort(function(a,b){
        if(a.time_updated > b.time_updated) return -1;
        if(a.time_updated < b.time_updated) return 1;
        return 0;
      });
      for(var i = 0; i < JSON.parse(res).length; i++ ){
        $(".bookmarkUrl").append('<div class="bookmarkElem"><a href='+obj[i].url+'></a>'+obj[i].comment+
        '</div>');
      }
    }
  });

  $('#addbtn').on('click', function(){
    var inputUrl = $("#inputUrl").val();
    var inputComment = $("#inputComment").val();

    $.ajax({
      type: "POST",
      url: "/create",
      dataType: "text",
      data: {
        "url": inputUrl,
        "comment": inputComment
      },
      success: function(data, textStatus){
        //$('#pii').text(data);
        console.log(data);
        console.log(textStatus);
      },
      error: function(xhr, textStatus, errorThrown){
        // エラー処理
      }
    });

  });

});
