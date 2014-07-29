var setBookmark = function(value){
    return $.ajax({
      url : '/bookmarks/mark',
      method : 'POST',
      data : { object:  value},

      success : function(response){
        
        // draw a bookmark
    }
  });
}

