class Book < ActiveRecord::Base
  belongs_to :user
  has_many :comments, dependent: :destroy
  before_save :sentence_parse
  before_save :long_parse

  has_many :user_books
  has_many :users, through: :user_books

  def sentence_parse #detrimental to perf. time
    tokenizer = TactfulTokenizer::Model.new
    self.sentences = tokenizer.tokenize_text(self.content) #uncommenting results in test failure
  end

  def long_parse
    self.sentences.each_with_index do |sentence, index|
      word_array = sentence.split(" ") #array of words
      if word_array.length > 20 #there are ~5 letters per word, we max out at 100 characters
        divisor = word_array.length/20
        sliced_sentence_array = word_array.each_slice((word_array.size / divisor).round).to_a
        sliced_sentence_array.map! { |sentence| sentence.join(" ") }
        self.sentences[index] = sliced_sentence_array
      end
      self.sentences = self.sentences.flatten
    end
  end

  def pages
    self.sentences.size - 1
  end

end

# [["Hello. This is a test to see if our thing works and this is the sentence that should be split up blah blah and I am working on this project with Brendan and Greg this is so fun blah blah blah."]]

#Book.create(title: "A", content: "Hello. This is a test to see if our thing works and this is the sentence that should be split up blah blah and I am working on this project with Brendan and Greg this is so fun blah blah blah.")

