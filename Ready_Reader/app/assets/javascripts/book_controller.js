var BookController = function(book) { // eventually want a current argument too

  var bookview = new BookView();


  // initialize the book based on the AJAX call

  // var book = new Book(bookview.getPages()); // book.current will update on AJAX request


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

    // PREPARE BOOK
    bookview.hideNonCurrent();
    text = bookview.getCurrentText(book.current);
    bookview.showCurrentSentence(text);

    // PREPARE SLIDER
    Slider.sliderProgress(book, book.current, book.end);

    // GET SLIDER ON MOUSE UP
    $('#slider_bar').mouseup(function() {
      var newPoint = +$(this).slider('value');

      text = bookview.getCurrentText(newPoint);
      bookview.showCurrentSentence(text);
      book.current = newPoint;

      Slider.updateText(book, bookview);
    });

    // PREPARE BOOKMARKS


    // PREPARE BINDINGS
    //bookview.getPage().on("mouseup", "#slider_bar", Slider.sliderProgress(book, newPoint, book.end))
    bookview.getPage().on("click", ".right", turnPageRight)
    bookview.getPage().on("click", ".left", turnPageLeft)

  }
};
