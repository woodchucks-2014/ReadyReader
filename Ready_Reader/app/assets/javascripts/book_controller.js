var BookController = function(book) {

  var bookview = new BookView();

  var turnPageRight = function() {
    book.turnPageRight();
    book.checkForBeginning();

   UpdatePage.page(book, bookview);
  }

  var turnPageLeft = function() {
    book.turnPageLeft();
    book.checkForEnd();

    UpdatePage.page(book, bookview);
  }

  this.initialize = function () {

    bookview.hideNonCurrent();
    text = bookview.getCurrentText(book.current);
    bookview.showCurrentSentence(text);

    Slider.sliderProgress(book, book.current, book.end);

    $('#slider_bar').mouseup(function() {
      var newPoint = +$(this).slider('value');

      text = bookview.getCurrentText(newPoint);
      bookview.showCurrentSentence(text);
      book.current = newPoint;

      Slider.updateText(book, bookview);
    });

    var bookmark = function(){
      setBookmark(book.current, book.end);
    }

    bookview.getPage().on("click", ".right", turnPageRight)
    bookview.getPage().on("click", ".left", turnPageLeft)
    bookview.getPage().on("click", ".bookmark", bookmark);
  }
};
