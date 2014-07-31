class SentenceWorker
  extend Tact_Token
  @queue = :sentences

  def self.perform(id)
    @book = Book.find(id)
    content_array = tokenize_special(@book.content, 10)
    content_array.each do |sentence|
      Sentence.create(book_id: @book.id, content: sentence)
    end
  end
end
