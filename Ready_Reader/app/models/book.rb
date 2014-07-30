class Book < ActiveRecord::Base

  has_many :users, through: :user_books
  has_many :comments, dependent: :destroy
  has_many :sentences, dependent: :destroy

  has_many :user_books
  has_many :bookmarks

  def prep_for_dom
    dom_sentences = []
    self.sentences.each do |sentence|
      dom_sentences << sentence.content
    end
    dom_sentences
  end

  def pages
    self.sentences.size - 1
  end

end
