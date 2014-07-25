class Book < ActiveRecord::Base
  belongs_to :user
  has_many :comments, dependent: :destroy
  before_save :sentence_parse
  #before_save :long_parse(150)


  def sentence_parse #detrimental to perf. time
    tokenizer = TactfulTokenizer::Model.new
    self.sentences = tokenizer.tokenize_text(self.content)
  end

  # def long_parse(max)
  #   self.sentences.each_with_index do |sentence, index|
  #     if sentence.length > max
  #       word_array = sentence.split(" ") #array of words
  #       word_array = word_array.each_slice(70) #array of arrays
  #       =


  #     end
  # end

  def pages
    self.sentences.size
  end

end
