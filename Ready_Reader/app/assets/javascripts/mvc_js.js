// BOOK MODEL

var Book = function(pages){//, current) {
  this.start = 0;
  this.current = 0;//current; //look into better (smarter) implementation for current.
  this.end = pages; // hidden in DOM, reliant on view
  console.log(this.end);
};

Book.prototype.checkForEnd = function() {
  if (this.current >= this.end) {
    this.current = this.end - 1;
  }
}

Book.prototype.checkForBeginning = function() {
  if (this.current <= 0){
    this.current = 0;
  }
}

Book.prototype.turnPageLeft = function() {
  this.current += 1
}

Book.prototype.turnPageRight = function() {
  this.current -= 1
}

// BOOK CONTROLLER

var BookController = function() { // eventually want a current argument too

  var bookview = new BookView();
  var book = new Book(bookview.getPages()); // book.current will update on AJAX request

  var turnPageRight = function() {
    book.turnPageRight();
    book.checkForBeginning();
    text = bookview.getCurrentText(book.current);
    bookview.showCurrentSentence(text);
  }

  var turnPageLeft = function() {
    book.turnPageLeft();
    book.checkForEnd();
    text = bookview.getCurrentText(book.current);
    bookview.showCurrentSentence(text);
  }



  this.initialize = function () {

    // PREPARE BOOK
    bookview.hideNonCurrent();
    text = bookview.getCurrentText(book.current);
    bookview.showCurrentSentence(text);

    // PREPARE SLIDER

    // PREPARE BOOKMARKS


    // PREPARE BINDINGS
    bookview.getPage().on("click", ".right", turnPageRight)
    bookview.getPage().on("click", ".left", turnPageLeft)

  }
};

  // var getCurrentPage = function(argument){
  //   console.log(keyLook);
  //   return $.ajax({
  //   url : '/check_point',
  //   method : 'POST',
  //   data : { object: JSON.parse(localStorage[keyLook]) },
  //   success : function(response){
  //   }
  // }

// BOOK VIEW

var BookView = function () {}

BookView.prototype.getCurrentText = function(index) {
  console.log("************");
  console.log($('.sentence' + index).text());
  return $('.sentence' + index).text();
}

BookView.prototype.showCurrentSentence = function(text) {
  $('.current_sentence').text(text);
}

BookView.prototype.bookId = function() { // LOCAL STORAGE RELATED
  return +$('.book_number').text();
}

BookView.prototype.reader = function() { // LOCAL STORAGE RELATED
  return $('.user_name').text();
}

BookView.prototype.hideNonCurrent = function(){
  $('.non_current_sentence').hide();
}

BookView.prototype.getPages = function(){
  return +$('.pages').text();
}

BookView.prototype.getPage = function(){
  return $(document);
}

// var lS = function (){
//   function initialize(bookview) {
//     var book_id = bookview.bookId;
//     var user_name = bookview.userName;
//     var userObject = {userName: user_name, bookId: book_id, currentSentence: 0};
//     localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
//   }
// }
