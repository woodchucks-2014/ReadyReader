class BooksController < ApplicationController
  # before_action :require_login - we need to figure out how to redirect if not logged in
  before_filter :check_for_mobile
  before_filter :prepare_for_mobile
  respond_to :json
  def show
    @book = Book.find(params[:id])
    @sentences = @book.sentences
    session[:book] = @book.id
    @pages = @book.pages

    @user = User.find(params[:user_id])
    @comments = Comment.where(book_id: @book.id, user_id: @user.id)
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

    book = Book.create(title: params[:title], content: content)
    @user.books << book
    redirect_to profile_path(@user)
  end

  def check_point
    p "*" * 100
    p "TEST"
    @user = User.find(session[:user]) # need to create guest user
    @book = Book.find(session[:book]) #Implement nesting to compensate for logging into multiple books.
    @user_book = UserBook.find_or_create_by(user_id: @user.id, book_id: @book.id)
    database_val = @user_book.farthest_point #defaults to 0

    local_val = params["object"]["currentSentence"].to_i
    p "*" * 100
    p local_val

    @user_book.farthest_point = local_val if local_val > database_val
    @user_book.save!
    p "*" * 100
    p "TEST"
    p @user_book.farthest_point
    render json: {farthest_point: @user_book.farthest_point}.to_json
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
