require 'rails_helper'

  feature 'ability to read a title and sentence from a book' do

    let!(:user_1) { FactoryGirl.create :user }
    let!(:book_1) { Book.create(title: "harry potter", content: "Wizards. Muggles. Conflict.", user_id: user_1.id) }

  before :each do
    visit root_path
    click_link 'Log In'
    fill_in 'Email', with: user_1.email
    fill_in 'Password', with: "test"
    click_button 'Log In'

    click_link book_1.title
    #visit user_book_path(user_1, book_1)
  end

    scenario 'user sees the title of the book' do
      expect(page).to have_content(book_1.title)
    end

    scenario 'user sees one sentence from the book' do
      expect(page).to have_content(book_1.sentences.sample)
    end

end
