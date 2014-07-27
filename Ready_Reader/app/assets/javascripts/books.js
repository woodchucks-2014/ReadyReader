
var Book = function(current, sentence){
  this.current = current;
  this.end = +$('.pages').text();
  this.sentence = sentence;
}

Book.prototype.checkForEnd = function(){
  if (this.current < this.end) { // error message should trigger on ==
        $('.current_sentence').text(this.sentence.currentSentence(this.current));
      } else {$('.current_sentence').text("You've reached the end :-(")}
}

Book.prototype.checkForBeginning = function(){
  if (this.current >= 0) {  // error message should trigger on ==
          $('.current_sentence').text(this.sentence.currentSentence(this.current));
          // line 18 should NOT replace .current_sentence
        } else {$('.current_sentence').text("You're just beginning!")}
}

var Sentence = function(book){
   this.book = book;
   this.pages = +$('.pages').text();
   this.index = 0;

  $(document).ready(function(){ //look into this tomorrow.
    $('.non_current_sentence').hide();

  });
}

Sentence.prototype.increment = function() {
   this.index += 1
   this.book.current = this.index;
   if (this.index > this.pages) { // should never be outside range
    this.index = this.pages;
    this.book.current = this.pages;
   }
}

Sentence.prototype.decrement = function() {
  this.index -= 1
  this.book.current = this.index;
  if (this.index < 0) {
    this.index = -1; // 0 should be lowest it can sink
    this.book.current = -1;
  }
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

var getBookId = function () {return +$('.book_number').text(); }

Sentence.prototype.last_point = function(index){
  var book_id = +$('.book_number').text();
  localStorage[book_id] = this.index;
  console.log(book_id)
}

var PageTurn = {

  left: function(sentence, book) {
      sentence.increment();
      book.checkForEnd();
      sentence.barProgress(book.current, book.end);
      $('.progress_bar').hide();
      $('.progress_bar').show();
      sentence.last_point(book.current);
      $('.text_progress').text("Sentence " + book.current + " of " + book.end )
  },

  right: function(sentence, book) {
      sentence.decrement();
      book.checkForBeginning();
      sentence.barProgress(book.current, book.end);
      $('.progress_bar').hide();
      $('.progress_bar').show();
      sentence.last_point(book.current);
      $('.text_progress').text("Sentence " + book.current + " of " + book.end )
  }
}

function get_cp(argument){
    return $.ajax({
    url : '/check_point',
    method : 'POST',
    data : { last_point: localStorage[getBookId()] },
    success : function(response){

    }
  });
};


$(document).ready(function() {
  $('.sentence_wrapper').hide();
  var positionUpdate = function(){
    return get_cp();
  }

 positionUpdate().done(function(result){ //may need slight tweaks.
    book = new Book(result.farthest_point, new Sentence());
    sentence = new Sentence(book);
    console.log(book);
    $('.current_sentence').text(sentence.currentSentence(book.current));
    $('.sentence_wrapper').show();
    sentence.barProgress(book.current, book.end);
    $('.progress_bar').show();
    $('.text_progress').text("Sentence " + book.current + " of " + book.end )
  })

  page = document.getElementById('book_wrapper');

  // Please note this is temporary until we can include Hammer.js
   $(".right").on("click", function() {
      PageTurn.right(sentence, book);
    });

    $(".left").on("click", function() {
      PageTurn.left(sentence, book);
    });
  // end of temporary code

  // var hammer_time = new Hammer(page);
  // hammer_time.on('swipeleft', function(){
  //   swipeleftHandler();
  //    get_cp();
  // });
  // hammer_time.on('swiperight', function(){
  //   swiperightHandler();
  //   get_cp();
  // });

  function swipeleftHandler(){
    PageTurn.left(sentence, book);

  }

  function swiperightHandler() {
    PageTurn.right(sentence, book);
  }

});


