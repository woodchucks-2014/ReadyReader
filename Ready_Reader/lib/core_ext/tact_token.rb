module Tact_Token

  def self.included klass
    klass.class_eval do
      include Tokenizer
    end
  end

 def tokenize_special(content, parse_length = 10)
    sentence_array = Tokenizer::tokenizer.tokenize_text(content)
    sentence_array.each_with_index do |sentence, index|
      word_array = sentence.split(" ") #array of words
      if word_array.length > parse_length #there are ~5 letters per word, we max out at 100 characters
        divisor = word_array.length / parse_length
        sliced_sentence_array = word_array.each_slice((word_array.size / divisor).round).to_a
        sliced_sentence_array.map! { |sentence| sentence.join(" ") }
        sentence_array[index] = sliced_sentence_array
      end
    end
    return sentence_array.flatten
  end

end
