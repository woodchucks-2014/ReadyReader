class UserBook < ActiveRecord::Base
  belongs_to :user
  belongs_to :book

  # before_save :max_point

  # def max_point
  #   if self.farthest_point > Book.find(self.book_id).pages
  #     self.farthest_point = Book.find(self.book_id).pages
  #   end
  # end

end
