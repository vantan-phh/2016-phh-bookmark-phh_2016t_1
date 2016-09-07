$(function(){

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
  
});
