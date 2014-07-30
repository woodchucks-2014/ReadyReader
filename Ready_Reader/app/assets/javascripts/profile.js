var barProfileProgress = function(progress, i){
    $(function() {
      $( ".progress_bar_index" + i ).progressbar({
        value: progress
      });
    });
};

$(document).ready(function() {
   for (i =0; i < +$('.book_count_user').text(); i++) {
      progress = +$('#bar' + i).text()
      a = i
      barProfileProgress(progress, i);
    }
  });
