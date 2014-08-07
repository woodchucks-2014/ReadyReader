$(function() {
  $('#book').change(function() {
    var book_path = document.getElementById('book').value;
    var bookPath = book_path.toString();
    var filename = bookPath.split('\\').pop().replace(/\..+$/, '');
    var filename = filename.split("_").join(" ")
    $('#title').val(filename);
  });
});