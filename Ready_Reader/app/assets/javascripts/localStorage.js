LocalStorage = {

  initialize : function () {

    var book_id = bookview.bookId();
    var user_name = bookview.reader();
    var userObject = {userName: user_name, bookId: book_id, currentSentence: 0};

    if (localStorage[user_name + book_id] === undefined) {
      localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
    }
    console.log(localStorage)
  },

  update : function(book, bookview) {

    var book_id = bookview.bookId();
    var user_name = bookview.reader();
    var userObject = {userName: user_name, bookId: book_id, currentSentence: book.current};

    localStorage.setItem(user_name + book_id, JSON.stringify(userObject));

  }
}
