$(function(){
  $(".search").click(function(){
    var searchWord = $(".serachWord").val();

    $.ajax({
      url:'/searchResult',
      type: 'POST',
      dataType: 'text',
      data: {
        "searchWord": searchWord,
      },
      success: function(data,textStatus) {
      }
  });
});
