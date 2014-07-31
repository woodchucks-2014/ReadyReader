$(document).ready(function() {
  $('#desktop_upload').on('submit', function(e){
    var field = document.getElementById('title').value;
    if (field === null || field === "") {
      e.preventDefault();
      $('#desktop_upload').append('<p>Please enter a title.</p>');
    }
  });
});
