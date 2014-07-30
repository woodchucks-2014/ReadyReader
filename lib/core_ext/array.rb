# class Array

#  def long_parse
#     self.each_with_index do |sentence, index|
#       word_array = sentence.split(" ") #array of words
#         if word_array.length > 20 #there are ~5 letters per word, we max out at 100 characters
#           divisor = word_array.length/20
#           sliced_sentence_array = word_array.each_slice((word_array.size / divisor).round).to_a
#           sliced_sentence_array.map! { |sentence| sentence.join(" ") }
#           self[index] = sliced_sentence_array
#         end
#       p "THIS IS GETTING CALLED"
#       p "*" * 100
#       p self
#       return self
#     end
#   end

# end
