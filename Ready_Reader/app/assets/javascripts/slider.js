var Slider = {

  updateText: function(book, bookview) {
    $('.percentage').text(parseInt((book.current / book.end) * 100) + '%'  )
    $('.text_progress').text(book.current + " of " + book.end )
    console.log(book)
    // bookview.showSentence();
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
            $('.text_progress').text(ui.value + " of " + pages );
            $('.percentage').text(parseInt((ui.value / pages) * 100) + '%'  )
            text = book.changeSentence(ui.value)
            bookview.showSentence(text);
        },

        create: function(event, ui) {
          $('.percentage').text(parseInt((book.current / book.end) * 100) + '%'  )
          $('.text_progress').text(book.current + " of " + book.end )
          Slider.updateText(book, bookview);
      }
    });
  }
}
