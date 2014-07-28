$(document).ready(function() {

  $('#signup').on("click", function(e) {
    e.preventDefault();
    console.log("ABC");
    $('#signupModal').modal();
  })

  $('#login').on("click", function(e) {
    e.preventDefault();
    $('#loginModal').modal();
  })






});
