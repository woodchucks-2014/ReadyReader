$(document).ready(function() {
  $('#desktop_upload').on('submit', function(e){
    var book = document.getElementById('book').value;
    var field = document.getElementById('title').value;
    console.log(book)
    if (field === null || field === "") {
      e.preventDefault();
      $('#desktop_upload').append('<p id="title_validation">Please enter a title.</p>').delay(6000).queue(function(rem){
        $('#title_validation').fadeOut('fast').remove();
      });
    }
    if (book === null || book === '') {
      e.preventDefault();
      $('#desktop_upload').append('<p id="file_validation">Please attach a file to upload.</p>').delay(6000).queue(function(rem){
        $('#file_validation').fadeOut('fast').remove();
      });
    }
  });
});
