
var Book = function(current, sentence){
  this.current = current;
  this.end = +$('.pages').text();
  this.sentence = sentence;
}

Book.prototype.checkForEnd = function(){
  if (this.current < this.end) {
        $('.current_sentence').text(this.sentence.currentSentence(this.current));
        $('.error_reading').text("")
      } else {$('.error_reading').text("<- End")}
}

Book.prototype.checkForBeginning = function(){
  if (this.current > 0) {
          $('.current_sentence').text(this.sentence.currentSentence(this.current));
          $('.error_reading').text("")

        } else {$('.error_reading').text("Begin ->")}
}

var Sentence = function(book, current){
   this.book = book;
   this.pages = +$('.pages').text();
   this.index = current;
}

Sentence.prototype.hideNoncurrent = function(){
    $('non_current_sentence').hide();
}

Sentence.prototype.increment = function() {
   this.index += 1
   this.book.current = this.index;
   if (this.index >= this.pages) { // should never be outside range
    this.index = this.pages;
    this.book.current = this.pages;
   }
}

Sentence.prototype.decrement = function() {
  this.index -= 1
  this.book.current = this.index;
  if (this.index < 0 && this.index != this.book.end) {
    this.index = 0; // 0 should be lowest it can sink
    this.book.current = 0;
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

var localStorageInit = function(){
  var book_id = +$('.book_number').text();
  var user_name = $('.user_name').text();
  var userObject = {userName: user_name, bookId: book_id, currentSentence: 0};

  if (localStorage[user_name + book_id] === undefined) {
     localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
  }
};

var localStorageUpdate = function(book){
  var book_id = +$('.book_number').text();
  var user_name = $('.user_name').text();
  var userObject = {userName: user_name, bookId: book_id, currentSentence: book.current};
  localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
}

var Refresh = {
  hideShow: function(){
    $('.progress_bar').hide();
    $('.progress_bar').show();
  },

  progress: function(book){
    $('.percentage').text(parseInt((book.current / book.end) * 100) + '%'  )
    $('.text_progress').text("Sentence " + book.current + " of " + book.end )
  }
}

var PageTurn = {

  left: function(sentence, book) {
      sentence.increment();
      book.checkForEnd();
      sentence.barProgress(book.current, book.end);
      Refresh.hideShow;
      Refresh.progress(book)
      localStorageUpdate(book);
  },

  right: function(sentence, book) {
      sentence.decrement();
      book.checkForBeginning();
      sentence.barProgress(book.current, book.end);
      Refresh.hideShow();
      Refresh.progress(book);
      localStorageUpdate(book);
  }
}

var initializeBook = function() {
  $('.non_current_sentence').hide();
  $('.sentence_wrapper').hide();
  $('.sentence_wrapper').show();
}


function get_cp(argument){
  var keyLook = $('.user_name').text() + +$('.book_number').text()
  console.log(keyLook);
    return $.ajax({
    url : '/check_point',
    method : 'POST',
    data : { object: JSON.parse(localStorage[keyLook]) },
    success : function(response){
    }
  });
};


$(document).ready(function() {
  localStorageInit();
  initializeBook();
  var positionUpdate = function(){
    return get_cp();
  }

 positionUpdate().done(function(result){ //may need slight tweaks.
    book = new Book(result.farthest_point, new Sentence());
    sentence = new Sentence(book, book.current);
    console.log(book);
    sentence.barProgress(book.current, book.end);
    $('.current_sentence').text(sentence.currentSentence(book.current));
    $('.progress_bar').show();
    $('.percentage').text(parseInt((book.current / book.end) * 100) + '%'  )
    $('.text_progress').text("Sentence " + book.current + " of " + book.end )
  })


  // Please note this is temporary until we can include Hammer.js
   $(".right").on("click", function() {
      PageTurn.right(sentence, book);
    });

    $(".left").on("click", function() {
      PageTurn.left(sentence, book);
    });
  // end of temporary code

  // Once asset pipeline issues are resolved, here's the code:
  // page = document.getElementById('book_wrapper');
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


