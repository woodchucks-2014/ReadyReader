$(document).ready(function() {

  $(".log_in_form").hide();

  $(".log_in").click(function(){
    console.log("TEST");
    $(".log_in_form").fadeIn("slow");
  });
});
