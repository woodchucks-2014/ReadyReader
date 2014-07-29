// TEMP
//
var getCurrentPage = function(keyLook){
    return $.ajax({
      url : '/check_point',
      method : 'POST',
      data : { object: JSON.parse(localStorage[keyLook]) },
      success : function(response){
      }
    });
  }

var UpdatePage = {
  page : function(book, bookview) {
    text = bookview.getCurrentText(book.current);
    bookview.showCurrentSentence(text);
    LocalStorage.update(book, bookview);

    Slider.sliderProgress(book, book.current, book.end);
    Slider.updateText(book, bookview);
    }
}









