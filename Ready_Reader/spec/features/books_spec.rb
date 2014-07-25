require 'rails_helper'

  feature 'ability to read a title and sentence from a book' do

    let!(:book) { FactoryGirl.create :book }
    let!(:user) { FactoryGirl.create :user }

  before :each do
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
    allow_any_instance_of(ApplicationController).to receive(:logged_in?).and_return(true)
    visit user_book_path(user.id, book.id)
  end

    scenario 'user sees the title of the book' do
      expect(page).to have_content(book.title)
    end

    scenario 'user sees one sentence from the book' do
      expect(page).to have_content(book.sentences[0])
    end

end
