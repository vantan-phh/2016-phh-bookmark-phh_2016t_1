$(function(){
  $(".button-collapse").sideNav();
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
      if(obj[i].thumbnail === 'No image'){
        obj[i].thumbnail = '/static/sample.png';
      }
      $(".bookmarkUrl").append(`<div class="card medium">
      <div class="card-image"><a href="/entry/${obj[i].urlId}/${obj[i].orgId}"><img src=${obj[i].thumbnail}></a></div>
      <div class="card-content"><a href="/entry/${obj[i].urlId}/${obj[i].orgId}"><p>${obj[i].title}</a></p></div>
      <div class="card-action"><a class="btn-floating btn-large waves-effect waves-light updateText" style="float:left;">
      <i class="large material-icons">mode_edit</i></a><a class="btn-floating btn-large waves-effect waves-light blue trash" style="float:right;">
      <i class="large material-icons">delete</i></a></div></div>`);
    }
  }

  orgId = $('#orgId').data('orgid');

  $.ajax({
    url:'/contents/org',
    type: 'POST',
    data: {
      "orgId": orgId
    },
    success: function(res) {
      redrawBookmark(res);
    }
  });


  $(document).on('click', '.trash', function(){ //
    // clickイベントで発動する処理
    var commentId = $(this).parents('.card').attr('id');
    $(this).parents('.card').fadeOut();


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

  $(document).on('click','.updateText',function(){
    var comment = $(this).parents().parents().parents().attr('id');
  });


  $('#addbtn').on('click',function(){
    var inputUrl = $("#inputUrl").val();
    var inputComment = $("#inputComment").val();

    $.ajax({
      type: "POST",
      url: "/create/org",
      dataType: "text",
      data: {
        "url": inputUrl,
        "comment": inputComment,
        "orgId" : orgId
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
