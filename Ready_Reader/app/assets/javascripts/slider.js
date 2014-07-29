var Slider = {

  hideShow: function() {
    $('.slider_bar').hide();
    $('.slider_bar').show();
  },

  progress: function(book) {
    $('.percentage').text(parseInt((book.current / book.end) * 100) + '%'  )
    $('.text_progress').text("Sentence " + book.current + " of " + book.end )
  },

  sliderProgress: function(current, pages) {
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
            var v= $(this).slider('value');
            $('.text_progress').text("Sentence " + v + " of " + book.end );
            $('.percentage').text(parseInt((v / book.end) * 100) + '%'  )
      }
    });
  }
}
