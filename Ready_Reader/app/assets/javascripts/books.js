
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

  $('.non_current_sentence').hide();
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

Sentence.prototype.barProgress = function(current, end){
   $(function() {
    $( "#progressbar" ).progressbar({
      value: (current / end) * 100,
      check: console.log(this.value)
    });
  });
}

var PageTurn = {

  left: function(sentence, book) {
      sentence.increment();
      book.checkForEnd();
      sentence.barProgress(book.current, book.end);
      $('.progress_bar').hide();
      $('.progress_bar').show();
  },

  right: function(sentence, book) {
      sentence.decrement();
      book.checkForBeginning();
      sentence.barProgress(book.current, book.end);
      $('.progress_bar').hide();
      $('.progress_bar').show();
  }
}


$(document).ready(function() {

  var book = new Book(0, new Sentence());
  var sentence = new Sentence(book);
  var pages = sentence.pages;
  sentence.barProgress(book.current, book.end);

  $('.current_sentence').text(sentence.currentSentence(sentence.index));
  $(".right").on("click", function() {
      PageTurn.right(sentence, book);
    });

  $('.book_wrapper').on("swipeleft", swipeleftHandler);
  $('.book_wrapper').on("swiperight", swiperightHandler);

  function swipeleftHandler(){
    PageTurn.left(sentence, book);
  }

  $(".left").on("click", function() {
      PageTurn.left(sentence, book);
    });

  function swiperightHandler() {
    PageTurn.right(sentence, book);
  }

});


