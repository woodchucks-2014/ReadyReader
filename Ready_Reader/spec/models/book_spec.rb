require 'rails_helper'

RSpec.describe Book, :type => :model do
  let(:book) {FactoryGirl.create :book}

  it "creates a book with a title and content" do
    expect(book).to be_valid
  end

  context "tactful tokenizer"

    it "is able to tokenize an "
end
