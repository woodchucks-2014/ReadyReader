module Tact_Token

 def tokenize(content)
    @tt ||= TactfulTokenizer::Model.new
    sentence_array = @tt.tokenize_text(content)
    sentence_array.long_parse
 end

end
