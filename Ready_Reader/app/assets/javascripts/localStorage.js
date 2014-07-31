LocalStorage = {

  initialize : function () {

    bookview = new BookView();

    var book_id = bookview.bookId();
    var user_name = bookview.reader();
    var userObject = {userName: user_name, bookId: book_id, currentSentence: 0};

    if (book_id === 0) {
      var userObject = {userName: Math.random().toString(), bookId: 0, currentSentence: 0};
      localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
    }
    if (localStorage[user_name + book_id] === undefined) {
      localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
    }
  },

  update : function(book, bookview) {

    bookview = new BookView();

    var book_id = bookview.bookId();
    var user_name = bookview.reader();
    var userObject = {userName: user_name, bookId: book_id, currentSentence: book.current};

    if (book_id === 0) {
      var userObject = {userName: Math.random().toString(), bookId: 0, currentSentence: 0};
      localStorage.setItem(user_name + book_id, JSON.stringify(userObject));
    }

    localStorage.setItem(user_name + book_id, JSON.stringify(userObject));

  }
}
