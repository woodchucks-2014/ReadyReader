module Tokenizer
  class << self
    def tokenizer
      @tokenizer ||= TactfulTokenizer::Model.new
    end
  end
end
