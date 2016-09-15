$(function(){
  var orgId = $(':hidden[name="orgId"]').val();
  console.log(orgId);
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

  $('.addMembers').on('click',function(){

    var word = $("#searchTerm").val();
    $.ajax({
      type: 'GET',
      url: '/',
      cache: false,
      dataType: 'text',
      success: function(data) {
        $('#').style.display = "block";
        $('#searchResult').html(data);
      },
      error: function() {
        alert("読み込み失敗");
      }
    });

    $("#search_results").slideUp();
    $("#search_button").click(function(e){
      e.preventDefault();
      ajax_search();
    });
    $("#search_term").keyup(function(e){
      e.preventDefault();
      ajax_search();
    });

  });

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
