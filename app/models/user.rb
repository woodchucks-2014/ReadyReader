class User < ActiveRecord::Base
  has_secure_password

  has_many :comments, dependent: :destroy

  has_many :user_books
  has_many :books, through: :user_books, dependent: :destroy
  has_many :bookmarks

  validates_presence_of :name, :email
  validates_uniqueness_of :email
  validates :email, format: {with: /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,}/}

end
