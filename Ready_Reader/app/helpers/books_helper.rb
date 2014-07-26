module BooksHelper

  def book_title
    Book.find(session[:book]).title if session[:book]
  end

end
