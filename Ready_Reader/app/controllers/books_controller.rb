class BooksController < ApplicationController
  # before_action :require_login - we need to figure out how to redirect if not logged in

  def show
    @book = Book.find(params[:id])
    # tokenizer = TactfulTokenizer::Model.new
    @sentences = @book.sentences
    session[:book] = @book.id
    @pages = @book.pages
  end

  def upload
    #@book = Book.new(book_params)
    @user = User.find(params[:user_id])
    p uploaded_io = params[:book]
    p uploaded_io
    p params
    filename = Rails.root.join('public', 'uploads', uploaded_io.original_filename)
    File.open(filename, 'wb') do |file|
      file.write(uploaded_io.read)
    end

    book = EPUB::Parser.parse(filename)

    content = ""

    book.each_page_on_spine do |page|
      page = page.content_document.nokogiri
      page.search('p').each{|el| el.before ' '}
      content << page.text
    end

    book = Book.create(title: params[:title], content: content, user_id: @user.id)

    redirect_to profile_path(@user)
  end

  def check_point
    p "*" * 100
    p session[:book]
    @user = User.find(session[:user])
    @book = Book.find(session[:book])
    @book.farthest_point = params["last_point"]
    p params
    redirect_to user_book_path(@user, session[:book])
  end

  def create

  end

  def delete

  end

  private

  def book_params(params)
    params.require(:book).permit(:title, :content)
  end


end
