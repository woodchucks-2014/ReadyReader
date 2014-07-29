class Book < ActiveRecord::Base

  belongs_to :user
  has_many :comments, dependent: :destroy

  has_many :user_books
  has_many :users, through: :user_books
  has_many :bookmarks

end
