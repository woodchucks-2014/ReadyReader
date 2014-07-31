module BooksHelper

  include Tact_Token

  def save_point(book_id)
    UserBook.where(book_id: book_id, user_id: current_user.id).first.farthest_point
  end

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
