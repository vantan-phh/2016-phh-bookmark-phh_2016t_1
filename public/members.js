$(function(){
  var $searchResults = $("#searchResults");
  var orgId = $(':hidden[name="orgId"]').val();
  $('.modal-trigger').leanModal();

  $('.addPerm').on('click',function(){
    var id = $(this).attr('id');
    console.log(id);
    console.log("click");
    $.ajax({
      type: "POST",
      url: "/perm",
      data: {
        "orgId":orgId,
        "id": id,
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




  $("#searchTerm").keyup(function(e){
    var word = $("#searchTerm").val();
    if (word != "") {
      $.ajax({
        type: "POST",
        url: "/namesearch",
        data: {
          "query": word,
        },
        success: function(result){
          if (result.length != 0) {
            var data = "";
            for (var i = 0;i < result.length ;i++) {
              data += `<a class="collection-item" id="${result[i].id}">${result[i].name}</a>`;
              console.log(result[i]);
            }
            $searchResults.html(data);
          } else {
            $searchResults.html("見つかりませんでした");
          }
        }
      });
    }
  });

  $(document).on('click','.collection-item',function(){
    console.log("hello");
    var inviteId  =$(this).attr("id");
    var invitees = new Array();
    invitees.push(inviteId);
    console.log(orgId);
    console.log(invitees);
    $.ajax({
      type: 'POST',
      url: '/invite',
      data: {
        "orgId":orgId,
        "invitees": invitees
      },
      dataType: 'text',
      success: function(data) {
        alert("招待しました");
      },
      error: function() {
        console.log("失敗");
      }
    });

});
/*
  $(".collection-item").on("click",function(){
    console.log("hello");
    var inviteId  =$(this).attr("id");
    console.log(inviteId);
    $.ajax({
      type: 'GET',
      url: '/invite',
      data: {
        "orgId":orgId,
        "invitees":inviteId
      },
      dataType: 'text',
      success: function(data) {
        console.log("招待成功");
      },
      error: function() {
        console.log("失敗");
      }
    });

  })
*/

  $(".inviteBtn").on('click',function(){
    var word = $("#searchTerm").val();
    var array = word.split(',');
    var invitees = [array.length];
    for(var i = 0;i < array.length;i++){
      invitees[i] = parseFloat(array[i]);
    }
    $.ajax({
      type: 'GET',
      url: '/invite',
      data: {
        "orgId":orgId,
        "invitees":invitees
      },
      dataType: 'text',
      success: function(data) {
        console.log("招待成功");
      },
      error: function() {
        console.log("失敗");
      }
    });
  });

});
