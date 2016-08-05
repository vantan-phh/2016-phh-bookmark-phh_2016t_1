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
      $(".bookmarkUrl").append('<div class="mdl-card mdl-shadow--3dp" id='+obj[i].id+'><div class="mdl-card__media mdl-color--grey-50"><a href='+obj[i].url+'><img src='+obj[i].image+'></a></div><div class="mdl-card__supporting-text"><a href='+obj[i].url+'><p>'+obj[i].title+'</p></a></div><div class="mdl-card__supporting-text"><p>'+obj[i].comment+'</p></div><div class="mdl-card__action"><i class="material-icons trash" aria-hidden="true" style="float:right;">delete</i></div></div>');
    }U
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
    var commentId = $(this).parents().parents().attr('id');
    //console.log(commentId);

    $.ajax({
      type: "POST",
      url: "/delete",
      dataType: "text",
      data: {
        "commentId": commentId,
      },
      success: function(data, textStatus){
      },
      error: function(xhr, textStatus, errorThrown){
        // エラー処理
      }
    });

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
