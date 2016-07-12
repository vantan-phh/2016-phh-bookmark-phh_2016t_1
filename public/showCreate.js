$(function(){

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
