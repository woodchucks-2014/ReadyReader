module BooksHelper

  def book_title
    Book.find(session[:book]).title if session[:book]
  end

  def title_parse(title)
    if title.length < 9
      return title
    else
      return title[0..9] + "..."
    end
  end

end
