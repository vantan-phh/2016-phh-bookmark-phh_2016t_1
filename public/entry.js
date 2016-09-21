$(function(){
  var url = $(':hidden[name="url"]').val();
  var orgId =$(':hidden[name="orgId"]').val();
  var urlId =$(':hidden[name="urlId"]').val();

  $('#addbtn').on('click',function(){
    var inputComment = $("#inputComment").val();
    console.log(inputComment);
    console.log(orgId);
    $.ajax({
      type: "POST",
      url: "/create/org",
      dataType: "text",
      data: {
        "url": url,
        "comment": inputComment,
        "orgId" : orgId
      },
      success: function(data, textStatus){
        //$('#pii').text(data);
        console.log(data);
        console.log(textStatus);
        console.log("成功!!!");
      },
      error: function(xhr, textStatus, errorThrown){
        // エラー処理
      }
    });
    location.reload();
  });

  $('#deleteBtn').on('click',function(){
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

  $('#addTagBtn').on('click',function(){
    var tagName = $("#inputTag").val();
    $.ajax({
      type: "POST",
      url: "/tag",
      dataType: "text",
      data: {
        "tagName": tagName,
        "orgId": orgId,
        "urlId": urlId
      },
      success: function(data, textStatus){
      },
      error: function(xhr, textStatus, errorThrown){
        // エラー処理
      }
    });

  });

});
