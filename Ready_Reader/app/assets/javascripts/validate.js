$(document).ready(function() {
  $('#desktop_upload').on('submit', function(e){
    var field = document.getElementById('title').value;
    if (field === null || field === "") {
      e.preventDefault();
      console.log('no');
    }
  });
});
