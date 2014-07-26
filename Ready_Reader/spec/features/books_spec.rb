require 'rails_helper'

  feature 'ability to read a title and sentence from a book' do

    let!(:user_1) { FactoryGirl.create :user }
    let!(:book_1) { Book.create(title: "harry potter", content: "Wizards. Muggles. Conflict.", user_id: user_1.id) }

    before :each do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user_1)
      allow_any_instance_of(ApplicationController).to receive(:logged_in?).and_return(true)
      visit user_book_path(user_1.id, book_1.id)
    end

    scenario 'user sees the title of the book' do
      expect(page).to have_content(book_1.title)
    end

    # scenario 'user sees one sentence from the book' do
    #   expect(page).to have_content(book_1.sentences.sample)
    # end

end
