$(function(){

  function redrawBookmark(res){
    obj = JSON.parse(res); //json形式をobject形式に変換
    //console.dir(obj);
    //console.log(JSON.parse(res).length);
    obj.sort(function(a,b){ //日付順に並び替え
      if(a.time_updated > b.time_updated) return -1;
      if(a.time_updated < b.time_updated) return 1;
      return 0;
    });
    for(var i = 0; i < JSON.parse(res).length; i++ ){ //ブックマークした要素の表示
      $(".bookmarkUrl").append('<div class="bookmarkElem" id='+obj[i].id+
      '><img src='+obj[i].image+' alt="No image"><a href='+obj[i].url+
      '>'+obj[i].title+'</a><p>'+obj[i].description+'</p><p style="margin:0px; padding:0px;">'+obj[i].comment+
      '</p><i class="trash fa fa-trash-o" aria-hidden="true" style="float:right;"></i></div>');
    }
  }


  $.ajax({
    url:'/contents',
    type: 'POST',
    success: function(res) {
      redrawBookmark(res);
    }
  });


  $(document).on('click', '.trash', function(){ //
    // clickイベントで発動する処理
    var urlId = $(this).parents().attr('id');
    console.log(urlId);
/*
    $.ajax({
      type: "POST",
      url: "/delete",
      dataType: "text",
      data: {
        "id": urlId,
      },
      success: function(data, textStatus){
      },
      error: function(xhr, textStatus, errorThrown){
        // エラー処理
      }
    });
    */
  });


  $('#addbtn').on('click',function(){
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
