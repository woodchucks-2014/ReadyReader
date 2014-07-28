module Tact_Token

 def initialize_tt(content)
    tt ||= TactfulTokenizer::Model.new
    tt.tokenize_text(content)
 end

end
