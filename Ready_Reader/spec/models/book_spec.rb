require 'rails_helper'

RSpec.describe Book, :type => :model do
  let(:book) {FactoryGirl.create :book}

  it "creates a book with a title and content" do
    expect(book).to be_valid
  end

  context "#long parse"
      let(:book_2) { Book.create(title: "A", content: "Hello. This is a test to see if our thing works and this is the sentence that should be split up blah blah and I am working on this project with Brendan and Greg this is so fun blah blah blah.") }

    it "takes a sentence that is over 20 words long and breaks it in half" do

      expect(book_2.sentences).to eq(["Hello.", "This is a test to see if our thing works and this is the sentence that should be split up", "blah blah and I am working on this project with Brendan and Greg this is so fun blah blah blah."])

    end
end
