function drawRectangle() {
  // bookmark drawing function

};

var setBookmark = function(value){
    return $.ajax({
      url : '/bookmarks/mark',
      method : 'POST',
      data : { marker:  value},

      success : function(response){
          var x = "75%"
          console.log(response);
          $('.custom_ticks').append('<div class="ui-slider-tick" style="left: '+x+'"></div>')

    }
  });
}

