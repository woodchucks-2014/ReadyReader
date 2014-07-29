var setBookmark = function(value){
    return $.ajax({
      url : '/bookmarks/mark',
      method : 'POST',
      data : { marker:  value},

      success : function(response){
          console.log(response);
        // draw a bookmark

    }
  });
}

