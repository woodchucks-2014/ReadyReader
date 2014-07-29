function drawRectangle() {
  // bookmark drawing function

};

var setBookmark = function(value, pages){
    total = pages
    return $.ajax({
      url : '/bookmarks/mark',
      method : 'POST',
      data : { marker:  value},

      success : function(response){
        $.each(response.bookmarks, function( index, mark ) {
          var val = (mark/total) * 100
          val.toString();
          tickMark = val + "%"

          $('.custom_ticks').append('<div class="ui-slider-tick" style="left: '+tickMark+'"></div>')
        });
    }
  });
}

