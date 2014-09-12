$(document).ready(function() {

  $('#signup').on("click", function(e) {
    e.preventDefault();
    $('#signupModal').modal();
  })

  $('#login').on("click", function(e) {
    e.preventDefault();
    $('#loginModal').modal();
  })

});
