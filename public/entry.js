$(function(){
  var url = $(':hidden[name="url"]').val();
  var orgId =$(':hidden[name="orgId"]').val();

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

  });
});
