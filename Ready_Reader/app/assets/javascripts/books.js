// // Books
// var Book = function(current, sentence, current){ // BOOK MODEL
//   this.current = current;
//   this.end = +$('.pages').text();
//   //this.sentence = sentence;
//   this.index = current;
// }

// Book.prototype.checkForEnd = function(){ // BOOK CONTROLLER
//   if (this.current === this.end) {
//    $('.error_reading').text("<- End")
//   } else {$('.error_reading').text("")};
//     $('.current_sentence').text(this.sentence.currentSentence(this.current));
// }

// Book.prototype.checkForBeginning = function(){ // BOOK CONTROLLER
//   if (this.current === 0) {
//     $('.error_reading').text("Begin ->");
//   } else {$('.error_reading').text("")}
//   $('.current_sentence').text(this.sentence.currentSentence(this.current));
// }

// // Sentences
// var Sentence = function(book, current){ // SENTENCE MODEL
//    this.book = book;
//    this.pages = +$('.pages').text(); // this is repetive, as book has same attribute
//    this.index = current;
// }
// //Hide all noncurrent sentence - elements on the DOM
// Sentence.prototype.hideNoncurrent = function(){ // SENTENCE VIEW
//     $('non_current_sentence').hide();
// }
// //Increment Function
// Sentence.prototype.increment = function() { // SENTENCE MODEL
//    this.index += 1
//    this.book.current = this.index;
//    if (this.index >= this.pages) { // should never be outside range
//     this.index = this.pages;
//     this.book.current = this.pages;
//    }
// }
// //Decriment function.
// Sentence.prototype.decrement = function() { // SENTENCE MODEL
//   this.index -= 1
//   this.book.current = this.index; // SOME DEPENDENCY HERE, DISCUSS
//   if (this.index < 0 && this.index != this.book.end) {
//     this.index = 0;
//     this.book.current = 0; // SEE EARLEIR COMMENT
//   }
// }

// Sentence.prototype.currentSentence = function(index) { // SENTENCE VIEW
//   return $('.sentence' + index).text();
// }

// Sentence.prototype.barProgress = function(current, end){ // SENTENCE VIEW
//    $(function() {
//     $( "#progressbar" ).progressbar({
//       value: (current / end) * 100,
//     });
//   });
// }

// // Slider
// var sliderProgress = function(current, pages){ // MODULE? DISCUSS

//   $("#slider_bar").slider({
//     range: "min",
//     value: current,
//     min: 0,
//     max: pages,
//     step: 1,
//     slide: function( event, ui ) {
//             $( "#amount" ).val( ui.value );
//             $('.text_progress').text("Sentence " + ui.value + " of " + pages );
//             $('.percentage').text(parseInt((ui.value / pages) * 100) + '%'  )
//         },
//         create: function(event, ui) {
//             var v= $(this).slider('value');
//             $('.text_progress').text("Sentence " + v + " of " + book.end );
//             $('.percentage').text(parseInt((v / book.end) * 100) + '%'  )
//       }
//   });
// }

// // localStorage
// var getBookId = function () {return +$('.book_number').text(); } // BOOK VIEW

// // var localStorageInit = function(){
// //   var book_id = +$('.book_number').text();
// //   var user_name = $('.user_name').text();
// //   var userObject = {userName: user_name, bookId: book_id, currentSentence: 0};

// //   if (localStorage[user_name + book_id] === undefined) {
// //      localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
// //   }
// // };

// // var localStorageUpdate = function(book){
// //   var book_id = +$('.book_number').text();
// //   var user_name = $('.user_name').text();
// //   var userObject = {userName: user_name, bookId: book_id, currentSentence: book.current};
// //   localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
// // }

// // PageTurn module
// var PageTurn = {  // THIS MAKES SENSE TO ME AND I AM OKAY WITH KEEPING

//   left: function(sentence, book) {
//       sentence.increment();
//       book.checkForEnd();

//       sentence.barProgress(book.current, book.end);
//       sliderProgress(book.current, book.end);

//       Refresh.hideShow;
//       Refresh.progress(book)
//       localStorageUpdate(book);
//   },

//   right: function(sentence, book) {
//       sentence.decrement();
//       book.checkForBeginning();
//       sentence.barProgress(book.current, book.end);
//       sliderProgress(book.current, book.end);

//       Refresh.hideShow();
//       Refresh.progress(book);
//       localStorageUpdate(book);
//   }
// }

// // Refresh module
// var Refresh = { // DO WE NEED HIDE SHOW TO REFRESH CSS?
//   hideShow: function(){
//     $('.slider_bar').hide();
//     $('.slider_bar').show();
//   },

//   progress: function(book){
//     $('.percentage').text(parseInt((book.current / book.end) * 100) + '%'  )
//     $('.text_progress').text("Sentence " + book.current + " of " + book.end )
//   }
// }

// // class refreshes
// // var initializeBook = function() {
// //   $('.non_current_sentence').hide();
// //   $('.sentence_wrapper').hide();
// //   $('.sentence_wrapper').show();
// //   $('.ui-slider-handle').hide();
// //   $('.ui-slider-handle').show();
// // }

// // AJAX callback setup
// var get_cp = function(argument) {
//   console.log("EXECUTION");
//   var keyLook = $('.user_name').text() + +$('.book_number').text()
//   console.log(keyLook);
//     return $.ajax({
//     url : '/check_point',
//     method : 'POST',
//     data : { object: JSON.parse(localStorage[keyLook]) },
//     success : function(response){
//     //setTimeout(function(){get_cp();}, 400);
//     }
//   });
// };

// // function ajaxInterval(request){
// //   timeOutId = setTimeout(request, 1000);
// // }
// var Book = function(start, end) {
//   this.start = 0;
//   this.end = end;
//   this.sentences = [];

// };

// Book.prototype.currentPosition = function() {


// }


// var BookView = function() {
//   var book = new Book();
// };

// BookView.prototype.showCurrentSentence = function() {
//   $('.non_current_sentence').hide();
//   $('.current_sentence').text();
// }

// BookView.prototype.bookId = function() {
//   return +$('.book_number').text();
// }

// BookView.prototype.userName = function() {
//   return $('.user_name').text();
// }

// BookView.prototype.initialize = function() {
//   $('.non_current_sentence').hide();
//   $('.sentence_wrapper').hide();
//   $('.sentence_wrapper').show();
//   $('.ui-slider-handle').hide();
//   $('.ui-slider-handle').show();
// }

// var lS = function (){
//   this.initialize = function (bookview) {
//     var book_id = bookview.bookId;
//     var user_name = bookview.userName;
//     var userObject = {userName: user_name, bookId: book_id, currentSentence: 0};
//     localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
//     if (localStorage[user_name + book_id] === undefined) {
//      localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
//     }
//   },

//   this.update = function(book, bookview) {
//     // var book_id = bookview.bookId;
//     // var user_name = bookview.userName;
//     // var userObject = {userName: user_name, bookId: book_id, currentSentence: book.current};
//     // localStorage.setItem(user_name + book_id, JSON.stringify(userObject));

//   }
// }


$(document).ready(function() {
  bookController = new BookController();
  bookController.initialize();
  // bookView = new BookView();
  // bookView.initialize();
  // lS = new lS();
  // lS.initialize(bookView);
  // console.log(localStorage);
  // bookView.showCurrentSentence();

  // setTimeout = (get_cp, 400);
  // localStorageInit();

  //ajaxInterval(get_cp());

 //  var positionUpdate = function(){
 //    return get_cp();
 //  }

 // positionUpdate().done(function(result){ //may need slight tweaks.
 //    book = new Book(result.farthest_point, new Sentence());
 //    sentence = new Sentence(book, book.current);
 //    console.log(book);
 //    sliderProgress(book.current, book.end);
 //    sentence.barProgress(book.current, book.end);

 //    $('.current_sentence').text(sentence.currentSentence(book.current));
 //    $('.progress_bar').show();
 //    Refresh.progress(book)
 //    lS.update(book);
 //  })

  // fast forward and rewind
  // $('#slider_bar').mouseup(function() {
  //   var newPoint = $(this).slider('value');

  //   $('.current_sentence').text(sentence.currentSentence(newPoint));

  //   sentence.index = newPoint;
  //   book.current = newPoint;

  //   // console.log("SUSENS SUCKS");
  //   // console.log(book);

  //   Refresh.hideShow();
  //   Refresh.progress(book);
  //   localStorageUpdate(book);
  // });

  // Please note this is temporary until we can include Hammer.js
   // $(".right").on("click", function() {
   //    PageTurn.right(sentence, book);
   //  });

   //  $(".left").on("click", function() {
   //    PageTurn.left(sentence, book);
   //  });
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

//   function swipeleftHandler(){
//     PageTurn.left(sentence, book);
//   }

//   function swiperightHandler() {
//     PageTurn.right(sentence, book);
//   }
});


