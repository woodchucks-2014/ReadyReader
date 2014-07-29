class Bookmark < ActiveRecord::Base
  belongs_to :user
  belongs_to :book


  def search_for_user_book_begin(user_id, book_id, position_begin)
    self.find(user_id: user_id, book_id: book_id, position_begin: position_begin)
  end

  def search_for_user_book_end(user_id, book_id, position_end)
    self.find(user_id: user_id, book_id: book_id, position_end: position_end)
  end

  def self.contiguous_close(user_id, book_id)
    bookmarks = self.find(user_id: user_id, book_id: book_id)
    bookmarks.each do |bookmark|
    if search_for_user_book_begin(user_id, book_id, bookmark.begin_at - 1).size == 1 || 
       search_for_user_book_end(user_id, book_id, bookmark.end_at + 1).size == 1
       bookmark.destroy
    end
  end
  
end
