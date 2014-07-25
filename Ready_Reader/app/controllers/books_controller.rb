class BooksController < ApplicationController
  # before_action :require_login - we need to figure out how to redirect if not logged in

  def show
    @book = Book.find(params[:id])
    @pages = @book.pages
  end

  def upload
    uploaded_book = params[:book]
    filename = Rails.root.join('public', 'uploads', uploaded_book.original_filename)
    File.open(filename, 'wb') do |file|
      file.write(uploaded_book.read)
    end

    book = EPUB::Parser.parse(filename)

    content = ""

    book.each_page_on_spine do |page|
      page = page.content_document.nokogiri
      page.search('p').each{|el| el.before ' '}
      content << page.text
    end

    book = Book.create(title: params[:title], content: content)

    redirect_to books_path(book.id)
  end

  def create

  end

  def delete

  end

end
