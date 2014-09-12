var getCurrentPage = function(keyLook){
  return $.ajax({
      url : '/check_point',
      method : 'POST',
      data : { object: JSON.parse(localStorage[keyLook]) },
      success : function(response){
        // setTimeout(function(){getCurrentPage(keyLook);}, 400);
      }
    });
  }

var UpdatePage = {
  page : function(book, bookview) {
    text = book.changeSentence(book.current);
    bookview.showSentence(text);

    LocalStorage.update(book, bookview);

    Slider.sliderProgress(book, book.current, book.end);
    Slider.updateText(book, bookview);
    }
}









