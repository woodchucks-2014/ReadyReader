class Book < ActiveRecord::Base

  has_many :users, through: :user_books
  has_many :comments, dependent: :destroy
  has_many :sentences, dependent: :destroy

  has_many :user_books
  has_many :bookmarks

  def self.eager
    includes(:sentences).limit(1000)
  end

  def dom
    Sentence.where(:book_id => self.id).pluck(:content)
  end
  
  def pages
    self.sentences.size - 1
  end

end
