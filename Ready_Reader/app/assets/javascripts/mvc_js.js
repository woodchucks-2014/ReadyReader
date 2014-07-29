// BOOK MODEL

var Book = function(pages) {
  this.start = 0;
  this.current = 0; //look into better (smarter) implementation for current.
  this.end = pages; // hidden in DOM, reliant on view
};

Book.prototype.checkForEnd = function() {
  if (this.current >= this.end) {
    this.current = this.end
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

var BookController = function() {
  var bookview = new BookView();
  var book = new Book(bookview.getPages()); // book.current will update on AJAX request

  var turnPageRight = function() {
    book.turnPageRight();
    book.checkForEnd();

    bookview.showCurrentSentence(book.current);

  }

  var turnPageLeft = function() {
    book.turnPageLeft();
    book.checkForBeginning();

    bookview.showCurrentSentence(book.current);
  }

  this.initialize = function () {
    bookview.hideNonCurrent();
    bookview.showCurrentSentence(book.current);

    bookview.getPage().on("click", ".right", turnPageRight)
    bookview.getPage().on("click", ".left", turnPageLeft)
  }
};

// BOOK VIEW

var BookView = function () {}

BookView.prototype.getCurrentText = function(index) {
  return $('.sentence' + index).text();
}

BookView.prototype.showCurrentSentence = function(index) {
  console.log("*************")
  console.log(index)
  text = this.getCurrentText(index);
  console.log(text)
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
