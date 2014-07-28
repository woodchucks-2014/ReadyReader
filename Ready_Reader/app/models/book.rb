class Book < ActiveRecord::Base
  belongs_to :user
  has_many :comments, dependent: :destroy

  has_many :user_books
  has_many :users, through: :user_books

  # def sentence_parse #detrimental to perf. time
  #   self.sentences = tokenizer.tokenize_text(self.content) #initialize TT via initializer
  # end

end
