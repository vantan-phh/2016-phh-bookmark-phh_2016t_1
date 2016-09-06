$(function(){
  $(document).ready(function () {
    hsize = $(window).height();
    $(".carousel").css("height", hsize + "px");
  });
  $(window).resize(function () {
    hsize = $(window).height();
    $(".carousel").css("height", hsize + "px");
  });

  $('.carousel.carousel-slider').carousel({full_width: true});
});
