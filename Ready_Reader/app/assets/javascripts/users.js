$(document).ready(function() {


  $('#signup').on("click", function(e) {
    e.preventDefault();
    $('#signup-modal').show();
  })

  $('#login').on("click", function(e) {
    e.preventDefault();
    console.log("TEST");
    $('#loginModal').modal();
  })



});