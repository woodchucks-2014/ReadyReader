$(document).ready(function() {
  $('#upload_box').on('submit', function(e){
    var book = document.getElementById('book').value;
    var field = document.getElementById('title').value;
    console.log(book);

    if (field === null || field === "") {
      e.preventDefault();
      $('#error_area').append('<p id="title_validation">Please enter a title.</p>').delay(6000).queue(function(rem){
        $('#error_area').fadeOut('fast').remove();
      });
    }
    if (book === null || book === '') {
      e.preventDefault();
      $('#error_area').append('<p id="file_validation">Please attach a file to upload.</p>').delay(6000).queue(function(rem){
        $('#error_area').fadeOut('fast').remove();
      });
    }
  });
});
