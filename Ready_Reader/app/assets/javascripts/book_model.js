var Book = function(current, pages){//, current) {
  this.start = 0;
  this.current = current; // reliant on AJAX request
  this.end = pages; // hidden in DOM, reliant on view
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
