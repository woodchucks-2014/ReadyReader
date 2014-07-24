class Book < ActiveRecord::Base
  belongs_to :user
  has_many :comments
  before_save :sentence_parse

  def sentence_parse
    tokenizer = TactfulTokenizer::Model.new
    self.sentences = tokenizer.tokenize_text(self.content)
  end

end
