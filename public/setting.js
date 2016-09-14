$(function(){
  $('button').on('click', function () {
    console.log("aa!");
    var displayName = $(".displayName").val();
    var name = $(".name").val();
    var password = $(".password").val();
    var email = $('.email').val();
    console.log(displayName, name, email, password);
    $.ajax({
      url  : "/setting",
      type : "POST",
      data : {
        displayName: displayName,
        name: name,
        email: email,
        password: password,
      },
    })
    .done(function(data, textStatus, jqXHR){
      var formdata = new FormData($('#updateForm').get(0));
      if (formdata.length != 0) {
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
          console.log("success");
        });
      }
    });
  });
});
