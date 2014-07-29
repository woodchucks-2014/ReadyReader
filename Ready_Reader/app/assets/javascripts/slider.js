var Slider = {

  updateText: function(book, bookview) {
    $('.percentage').text(parseInt((book.current / book.end) * 100) + '%'  )
    $('.text_progress').text("Sentence " + book.current + " of " + book.end )
    LocalStorage.update(book, bookview);
  },

  hideShow: function() {
    $('.slider_bar').hide();
    $('.slider_bar').show();
  },

  sliderProgress: function(book, current, pages) {
    bookview = new BookView();
     $("#slider_bar").slider({
        range: "min",
        value: current,
        min: 0,
        max: pages,
        step: 1,
        slide: function( event, ui ) {
            $( "#amount" ).val( ui.value );
            $('.text_progress').text("Sentence " + ui.value + " of " + pages );
            $('.percentage').text(parseInt((ui.value / pages) * 100) + '%'  )
        },

        create: function(event, ui) {
          $('.percentage').text(parseInt((book.current / book.end) * 100) + '%'  )
          $('.text_progress').text("Sentence " + book.current + " of " + book.end )
          Slider.updateText(book, bookview);
      }
    });
  }
}
