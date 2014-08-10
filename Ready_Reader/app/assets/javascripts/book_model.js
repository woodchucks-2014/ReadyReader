var Book = function(current, pages, sentences){
  this.start = 0;
  this.current = current;
  this.end = pages;
  this.sentences = sentences;
};

Book.prototype.checkForEnd = function() {
  if (this.current >= this.end) {
    this.current = this.end;
  }
}

Book.prototype.checkForBeginning = function() {
  if (this.current <= 0){
    this.current = 0;
  }
}

Book.prototype.turnPageLeft = function() {
  this.current += 1;
}

Book.prototype.turnPageRight = function() {
  this.current -= 1
}

Book.prototype.changeSentence = function(index) {
 return this.sentences[index];
}

