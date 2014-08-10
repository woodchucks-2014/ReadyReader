var Read = function() {

  bookview = new BookView();
  bookview.initializeBook();

  var positionUpdate = function(){
    return getCurrentPage(bookview.reader() + bookview.bookId());
  };


  positionUpdate().done(function(result){
    book = new Book(result.farthest_point, bookview.getPages());
    bookcontroller = new BookController(book);
    bookcontroller.initialize(bookview);

    initializeBookMarks(result.bookmarks, book.end);

    LocalStorage.update(book, bookview)
  });

  var getTheSentences = function() {
   return $.ajax({
    url : '/sentences.json',
    method: 'get',
    dataType: 'json',
    success: function(response) {
     result = response;
    }
   });
  };

  getTheSentences().done(function(result) {
    book.sentences = result.sentences;
    bookview.showSentence(book.changeSentence(book.current));
  });
}
