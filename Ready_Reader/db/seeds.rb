include Tact_Token

promo = Book.create(title: "ReadyReader", content: "Tap by tap, ReadyReader delivers your books to you sentence by sentence. Upload your favorite books and read them on your phone. On the train with no internet connection? ReadyReader lets you read individual books offline and saves your progress using persistent local storage in HTML5. Don't believe us? Try closing out of this browser now and opening back up to this page. Sign up now and get reading!")

universal_books = [['public/uploads/orwell-animal-farm.epub', "Animal Farm"], ['public/uploads/gatsby.epub', "The Great Gatsby"]]

universal_books.each do |filename|
  book = EPUB::Parser.parse(filename[0])
  content = ""

  book.each_page_on_spine do |page|
    page = page.content_document.nokogiri
    page.search('p').each{|el| el.before ' '}
    content << page.text
  end

  new_book = Book.create(title: filename[1], content: content, universal: true)

  content_array = tokenize_special(new_book.content, 10)
  content_array.each do |sentence|
    Sentence.create(book_id: new_book.id, content: sentence)
  end
end

#promo user
sentences = tokenize_special(promo.content, 20)
sentences.each { |sentence| Sentence.create(book_id: promo.id, content: sentence)}


promo_user = User.create(name: "user", email: "user@user.com", password: "test", password_confirmation: "test")
ben = User.create(name: "Ben", email: "ben@ben.com", password: "test", password_confirmation: "test")
greg = User.create(name: "Greg", email: "greg@greg.com", password: "test", password_confirmation: "test")

promo_user.books << promo











