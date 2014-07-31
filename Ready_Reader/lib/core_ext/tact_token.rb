# class Array

#  def long_parse(array)
#       array.each_with_index do |sentence, index|
#       word_array = sentence.split(" ") #array of words
#         if word_array.length > 20 #there are ~5 letters per word, we max out at 100 characters
#           divisor = word_array.length/20
#           sliced_sentence_array = word_array.each_slice((word_array.size / divisor).round).to_a
#           sliced_sentence_array.map! { |sentence| sentence.join(" ") }
#           array[index] = sliced_sentence_array
#         end
#       p "THIS IS GETTING CALLED"
#       p "*" * 100
#       p array
#       return array
#     end
#   end

# end

module Tact_Token

  $tt ||= TactfulTokenizer::Model.new

 def tokenize_special(content)
    sentence_array = $tt.tokenize_text(content)
     sentence_array.each_with_index do |sentence, index|
      word_array = sentence.split(" ") #array of words
      p "&" * 100
      p word_array
        if word_array.length > 10 #there are ~5 letters per word, we max out at 100 characters
          divisor = word_array.length/10
          sliced_sentence_array = word_array.each_slice((word_array.size / divisor).round).to_a
          sliced_sentence_array.map! { |sentence| sentence.join(" ") }
          sentence_array[index] = sliced_sentence_array
          p "UF"
          p "*" * 100
          p sentence_array
        end
      p "THIS IS GETTING CALLED"
      p "*" * 100
      #p array
      end
      return sentence_array.flatten
    end

end
