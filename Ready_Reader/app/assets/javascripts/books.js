
var Sentence = function(){
   this.pages = +$('.pages').text();
   if (localStorage['index'] === undefined) {
   this.index = 0;
  } else {this.index = +localStorage['index']}
}

Sentence.prototype.increment = function() {
   this.index += 1
   if (this.index > this.pages) {
    this.index = this.pages;
   }
   localStorage['index'] = this.index;
}

Sentence.prototype.decrement = function() {
  this.index -= 1
  if (this.index <= 0) {
    this.index = 0;
  }
  localStorage['index'] = this.index;
}

Sentence.prototype.currentSentence = function(index) {
  return $('.sentence' + index).text();
}


$(document).ready(function() {

  var sentence = new Sentence();
  var pages = sentence.pages;
  console.log(sentence.index);

  $('p').hide();
  $('.current_sentence').text(sentence.currentSentence(sentence.index));


  $(".right").on("click", function(e) {
      console.log("HI");
      e.preventDefault();
      sentence.increment();
      console.log(sentence.index);

      if (sentence.index < sentence.pages) {
        $('.current_sentence').text(sentence.currentSentence(sentence.index));
      } else {$('.current_sentence').text("You've reached the end :-(")}
    });


  $(".left").on("click", function(e) {
      console.log("HI");
      e.preventDefault();
      sentence.decrement();
      console.log(sentence.index);

      if (sentence.index > 0) {
        $('.current_sentence').text(sentence.currentSentence(sentence.index));
      } else {$('.current_sentence').text("You're just beginning!")}

    });
});
