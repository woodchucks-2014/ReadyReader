require 'rails_helper'

feature 'ability to read a sentence from a book' do

  before(:each) do
    let(:book) { FactoryGirl.create :book}
    visit books_path(1)
  end

  scenario 'user sees the title of the book' do
    expect(page).to have_content(book.title)
  end

  scenario 'user sees one sentence from the book' do
    expect(page).to have_content(book.sentences[0])
  end

end
