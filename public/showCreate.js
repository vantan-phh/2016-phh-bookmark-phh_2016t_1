$(function(){

  $('#addbtn').on('click', function(){
    var inputUrl = $("#inputUrl").val();

    $.ajax({
      type: "POST",
      url: "/",
      dataType: "text",
      data: {
        "url": inputUrl
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
