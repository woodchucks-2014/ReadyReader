var BookView = function () {}
  // var view = this;

//   $('#slider_bar').mouseup(function(e) {
//       // var book = new Book(0, view.getPages());
//       var newPoint = +$(this).slider('value');

//       text = view.getCurrentText(newPoint);
//       view.showCurrentSentence(text);
//       book.current = newPoint;

//       Slider.updateText(book, view);
//     });
// }

BookView.prototype.getCurrentText = function(index) {
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

BookView.prototype.initializeBook = function() {
  $('.non_current_sentence').hide();
  $('.sentence_wrapper').hide();
  $('.sentence_wrapper').show();
  $('.ui-slider-handle').hide();
  $('.ui-slider-handle').show();
}
BookView.prototype.keyLook = function () {
  var userName = $('.user_name').text();
  var bookNumber = $('.book_number').text();
  return userName + bookNumber;
}
