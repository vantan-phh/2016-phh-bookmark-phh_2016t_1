$(function(){
  var $sendBtn = $('#sendBtn');
  var $password = $("input[name='password']");
  $sendBtn.on('click', function () {
    console.log("aa!");
    var displayName = $("input[name='displayName']").val();
    var name = $("input[name='name']").val();
    var email = $("input[name='email']").val();
    var newpassword = $("input[name='newpassword']").val();
    var password = $("input[name='password']").val();
    console.log(displayName, name, email, password);
    $.ajax({
      url  : "/setting",
      type : "POST",
      data : {
        displayName : displayName,
        name : name,
        email : email,
        newpassword : newpassword,
        password : password,
      },
    })
    .done(function(data, textStatus, jqXHR) {
      var formdata = new FormData($('#updateForm').get(0));
      if (formdata.length) {
        $.ajax({
          url  : "/setting/icon",
          type : "POST",
          data : formdata,
          cache       : false,
          contentType : false,
          processData : false,
          dataType    : "html"
        })
        .done(function(data, textStatus, jqXHR){
          console.log("iconsuccess");
        });
      } else {
        console.log("success");
      }
    });
  });
  $password.on('change', function () {
    if ($password.val().length !== "") {
      $sendBtn.prop("disabled", false);
    }
  });
});
