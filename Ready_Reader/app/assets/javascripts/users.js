$(document).ready(function() {


  $('#signup').on("click", function(e) {
    e.preventDefault();
    console.log("SIGNUP EFFECTIVE");
    $('#signupModal').modal();
  })

  $('#login').on("click", function(e) {
    e.preventDefault();
    console.log("LOGIN EFFECTIVE");
    $('#loginModal').modal();
  })



});
