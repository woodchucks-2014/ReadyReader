var TickMarkView = {
  view: function(tickMark) {
    $('.custom_ticks').append('<div class="ui-slider-tick" style="left: '+tickMark+'"></div>')
  },

  stringify: function(mark, total) {
    var val = (mark/total) * 100
    val.toString();
    tickMark = val + "%"
    return tickMark
  }

}

function initializeBookMarks(bookmarks, pages) {
  total = pages
  $.each(bookmarks, function( index, mark ) {
    tickMark = TickMarkView.stringify(mark, total);
    TickMarkView.view(tickMark);
  });
};

var setBookmark = function(value, pages){
    console.log("EXECUTING");
    total = pages
    return $.ajax({
      url : '/bookmarks/mark',
      method : 'POST',
      data : { marker:  value },

      success : function(response){
        $.each(response.bookmarks, function( index, mark ) {
          tickMark = TickMarkView.stringify(mark, total);
          TickMarkView.view(tickMark);
        });
    }
  });
}

