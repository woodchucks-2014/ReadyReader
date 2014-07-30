include Tact_Token

promo = Book.create(title: "ReadyReader", content: "Tap by tap, ReadyReader delivers your books to you sentence by sentence. Upload your favorite books and read them on your phone. On the train with no internet connection? ReadyReader lets you read individual books offline and saves your progress using persistent local storage in HTML5. Don't believe us? Try closing out of this browser now and opening back up to this page. Sign up now and get reading!", universal: true)

hp = Book.create(title: "Harry Potter and the Deathly Hallows", content: "It's the final book! Harry finds three things that allow him to defeat Voldemort. Then he sees his parents in pseudo heaven... blah blah blah. Mr. Potter is not liked by Professor Snape!")
sound_fury = Book.create(title: "The Sound and the Fury", content: "Benny has no idea what's going on. The family is fighting! The Old South is full of sound and fury. The end.")
infinite_jest = Book.create(title: "Infinite Jest", content: "Really meaningful stuff. Here's a super long sentence that our app should parse and if it doesn't you probably know that sentence went wrong, DFW likes to write long sentences but that's fine since he at one point was considered the best writer of our time blah blah blah blah. The end")


books = [promo, hp, sound_fury, infinite_jest]
books.each do |book|
  sentences = tokenize_special(book.content)
  sentences.each { |sentence| Sentence.create(book_id: book.id, content: sentence)}
end

promo_user = User.create(name: "user", email: "user@user.com", password: "test", password_confirmation: "test")
ben = User.create(name: "Ben", email: "ben@ben.com", password: "test", password_confirmation: "test")
greg = User.create(name: "Greg", email: "greg@greg.com", password: "test", password_confirmation: "test")

promo_user.books << promo
ben.books << [hp, infinite_jest]
greg.books << sound_fury


User.all.each do |user|
  user.books << promo
end







