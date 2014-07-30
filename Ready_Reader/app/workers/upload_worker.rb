class UploadWorker
  @queue = :upload

  def self.perform(user_id, filename)
    @user = User.find(user_id)
    book = EPUB::Parser.parse(filename)
    content = ""

    book.each_page_on_spine do |page|
      page = page.content_document.nokogiri
      page.search('p').each{|el| el.before ' '}
      content << page.text
    end

    book = Book.create(title: params[:title], content: content)
    @user.books << book
  end
end
