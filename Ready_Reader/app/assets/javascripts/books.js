
var Book = function(current, sentence){
  this.current = current;
  this.end = +$('.pages').text();
  this.sentence = sentence;
}

Book.prototype.checkForEnd = function(){
  //console.log(sentence.currentSentence)
  if (this.current < this.end) {
        $('.current_sentence').text(this.sentence.currentSentence(this.current));
      } else {$('.current_sentence').text("You've reached the end :-(")}
}

Book.prototype.checkForBeginning = function(){
  //console.log(sentence.currentSentence)
  if (this.current >= 0) {
          $('.current_sentence').text(this.sentence.currentSentence(this.current));
        } else {$('.current_sentence').text("You're just beginning!")}
}

var Sentence = function(book){
   this.book = book;
   this.pages = +$('.pages').text();
   this.index = 0;

  // if (localStorage['index'] === undefined) {
  // this.index = 0;
  //} else {this.index = +localStorage['index']}

  $('p').hide();
}

Sentence.prototype.increment = function() {
   console.log("INCREMENT")
   this.index += 1
   this.book.current = this.index;
   if (this.index > this.pages) {
    this.index = this.pages;
    this.book.current = this.pages;
   }
   //localStorage['index'] = this.index;
}

Sentence.prototype.decrement = function() {
  console.log("DECREMENT")
  this.index -= 1
  this.book.current = this.index;
  if (this.index < 0) {
    this.index = -1;
    this.book.current = -1;
  }
  //localStorage['index'] = this.index;
}

Sentence.prototype.currentSentence = function(index) {
  return $('.sentence' + index).text();
}

var PageTurn = {

  left: function(sentence, book) {
      sentence.increment();
      book.checkForEnd();
  },

  right: function(sentence, book) {
      sentence.decrement();
      book.checkForBeginning();
  }
}


$(document).ready(function() {

  var book = new Book(0, new Sentence());
  console.log(book)
  var sentence = new Sentence(book);
  var pages = sentence.pages;

   console.log(book.current);
   console.log(sentence.index);

  $('.current_sentence').text(sentence.currentSentence(sentence.index));



  $(".right").on("click", function(e) {
      PageTurn.right(sentence, book);
      console.log(book.current);
      console.log(sentence.index);
    });

  $('.book_wrapper').on("swipeleft", swipeleftHandler);
  $('.book_wrapper').on("swiperight", swiperightHandler);


  function swipeleftHandler(){
    PageTurn.left(sentence, book);
  }


  $(".left").on("click", function(e) {
      PageTurn.left(sentence, book);
      console.log(book.current);
      console.log(sentence.index);
    });

  function swiperightHandler() {
    PageTurn.right(sentence, book);
  }

});
