# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

promo = Book.create(title: "ReadyReader", content: "Tap by tap, swipe by swipe, ReadyReader delivers your books to you sentence by sentence. Upload your favorite books and read them on your phone. Sign up now and get reading!")

hp = Book.create(title: "Harry Potter and the Deathly Hallows", content: "It's the final book! Harry finds three things that allow him to defeat Voldemort. Then he sees his parents in pseudo heaven... blah blah blah. Mr. Potter is not liked by Professor Snape!")

sound_fury = Book.create(title: "The Sound and the Fury", content: "Benny has no idea what's going on. The family is fighting! The Old South is full of sound and fury. The end.")


infinite_jest = Book.create(title: "Infinite Jest", content: "Really meaningful stuff. Here's a super long sentence that our app should parse and if it doesn't you probably know that sentence went wrong, DFW likes to write long sentences but that's fine since he at one point was considered the best writer of our time blah blah blah blah. The end")

ben = User.create(name: "Ben", email: "ben@ben.com", password: "test", password_confirmation: "test")

greg = User.create(name: "Greg", email: "greg@greg.com", password: "test", password_confirmation: "test")

ben.books << [hp, infinite_jest]
greg.books << sound_fury



