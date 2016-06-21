$(window).scroll(function() {
  var windowOffset = $(window).scrollTop();
  var reachedDiv 	 = (400 - windowOffset) <= 0;
  
  if (reachedDiv && !$('html').hasClass("touch")) {
    $('header').addClass('solid');
  } else {
    $('header').removeClass('solid');
  }
});
