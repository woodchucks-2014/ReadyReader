class Book < ActiveRecord::Base
  belongs_to :user
  has_many :comments, dependent: :destroy
  before_save :sentence_parse
  #before_save :long_parse


  def sentence_parse #detrimental to perf. time
    tokenizer = TactfulTokenizer::Model.new
    self.sentences = tokenizer.tokenize_text(self.content) #uncommenting results in test failure
  end

  # def long_parse
  #   first_half = []
  #   second_half = []
  #   self.sentences.each do |sentence|
  #     if sentence.length > 80
  #       word_array = sentence.split(" ") #array of words
  #       first_half << word_array[0..(word_array.length/2)]
  #       second_half << word_array[(word_array.length/2 + 1)..-1]
  #     end
  #   first_half.flatten.join(' ')
  #   second_half.flatten.join(' ')
  #   end
  # end

  def pages
    self.sentences.size
  end

end
