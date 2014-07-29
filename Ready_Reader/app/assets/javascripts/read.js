var Read = function() {

  bookview = new BookView();
  bookview.initializeBook();

  var positionUpdate = function (){ // use a callback to get the current page
    return getCurrentPage(bookview.reader() + bookview.bookId());
  };

  positionUpdate().done(function(result){
    book = new Book(result.farthest_point, bookview.getPages());
    bookcontroller = new BookController(book);
    bookcontroller.initialize();
    LocalStorage.update(book, bookview)
  });
}
