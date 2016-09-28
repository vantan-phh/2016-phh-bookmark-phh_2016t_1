$(function(){
  var $searchTerm = $("#searchTerm");
  var $searchResults = $("#searchResults");
  var orgId = $(':hidden[name="orgId"]').val();
  var selectedUsers = [];
  var $selectedUsers = $("#selectedUsers");
  var $inviteBtn = $("#inviteBtn");

  $('.modal-trigger').leanModal();

  $('.addPerm').on('click',function(){
    var id = $(this).data('id');
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


  $('.kick').on('click',function(){
    var id = $(this).data('id');
    console.log(id);
    console.log("click");
    $.ajax({
      type: "POST",
      url: "/kick",
      data: {
        "orgId": orgId,
        "kickedId": id,
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


  $searchTerm.keyup(function(e){
    var word = $searchTerm.val();
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

            var userIds = [];
            for (var i=0; i<selectedUsers.length; i++) {
              userIds.push(selectedUsers[i].id);
            }

            for (var i = 0; i < result.length; i++) {
              for (var j = 0; j < userIds.length; j++) {
                if (result[i].id == userIds[j]) {
                  result.splice(i,1);
                  i--;
                }
              }
            }

            for (var i = 0; i < result.length ;i++) {
              data += `<a class="nameSearchResult collection-item" data-id="${result[i].id}" data-name="${result[i].name}">${result[i].displayName} <span>@${result[i].name}</span></a>`;
              console.log(result[i]);
            }
            $searchResults.html(data);
          } else {
            $searchResults.html('<a class="collection-item">見つかりませんでした</a>');
          }
        }
      });
    }
  });

  function inviteUsers(orgId, invitees) {
    $.ajax({
      type: 'POST',
      url: '/invite',
      data: {
        "orgId": orgId,
        "invitees": invitees
      },
      success: function(data) {
        alert("招待しました");
      },
      error: function() {
        console.log("失敗");
      }
    });
  }

  $(document).on('click','.nameSearchResult',function(){
    var inviteId = $(this).data("id");
    var inviteName = $(this).data("name");

    selectedUsers.push({
      id: parseInt(inviteId, 10),
      name: inviteName
    });

    $searchTerm.val('');
    $(this).remove();
    $searchResults.html('');

    var strs = "";
    for (var i = 0; i < selectedUsers.length; i++) {
      strs += `<a class="collection-item" data-id="${selectedUsers[i].id}" data-name="${selectedUsers[i].name}">${selectedUsers[i].name}</a>`;
    }

    $selectedUsers.html(strs);

    console.log(orgId);
    console.log(selectedUsers);

  });

  $(document).on('click','#inviteBtn',function(){
    var userIds = [];
    for (var i=0; i<selectedUsers.length; i++) {
      userIds.push(selectedUsers[i].id);
    }
    inviteUsers(orgId, userIds);
    selectedUsers = [];
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
//
//   $(".inviteBtn").on('click',function(){
//     var word = $searchTerm.val();
//     var array = word.split(',');
//     var invitees = [array.length];
//     for(var i = 0;i < array.length;i++){
//       invitees[i] = parseFloat(array[i]);
//     }
//     $.ajax({
//       type: 'GET',
//       url: '/invite',
//       data: {
//         "orgId":orgId,
//         "invitees":invitees
//       },
//       dataType: 'text',
//       success: function(data) {
//         console.log("招待成功");
//       },
//       error: function() {
//         console.log("失敗");
//       }
//     });
//   });
//
});
