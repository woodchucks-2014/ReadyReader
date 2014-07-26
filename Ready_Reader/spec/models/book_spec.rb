require 'rails_helper'

RSpec.describe Book, :type => :model do
  let(:book) {FactoryGirl.create :book}

  it "creates a book with a title and content" do
    expect(book).to be_valid
  end

  context "#long parse"
      let(:book_2) {Book.create(title: "Test", sentences: "If you're trying to use features that don't seem to be in the latest released gem, but are mentioned in this README, then you probably need to specify the master branch if you want to use them.")}

    it "takes a sentence that is over 150 characters long and breaks it in half" do
      book_2.long_parse

      expect(book_2.sentences).to eq("If you're trying to use features that don't seem to be in the latest released gem, but are mentioned", "in this README, then you probably need to specify the master branch if you want to use them.")

    end
end
