  $(function() {
    for (i =0; i < +$('.book_count_user').text(); i++) {
      console.log(i);
      $( "#progress_bar" + i ).progressbar({
        value: 10
      });
    };
  });
