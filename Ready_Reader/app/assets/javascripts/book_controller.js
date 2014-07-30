var BookController = function(book) {

  // var bookview = new BookView();
  this.bookview;

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

  this.initialize = function (bookview) {
    this.bookview = bookview;
    bookview.book = this.book;

    bookview.hideNonCurrent();
    text = bookview.getCurrentText(book.current);
    bookview.showCurrentSentence(text);

    Slider.sliderProgress(book, book.current, book.end);

    // consider refactoring (event binding link on 42-44)
    $('#slider_bar').mouseup(function() {
      var newPoint = +$(this).slider('value');
      book.current = newPoint;
      text = bookview.getCurrentText(newPoint);
      bookview.showCurrentSentence(text);
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
