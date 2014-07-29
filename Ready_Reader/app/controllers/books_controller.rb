class BooksController < ApplicationController

  include Tact_Token

  # before_action :require_login - we need to figure out how to redirect if not logged in
  before_filter :check_for_mobile
  before_filter :prepare_for_mobile
  respond_to :json


  def show
    @book = Book.find(params[:id])
    @sentences = tokenize(@book.content) #gets into sentences
    p "WE ARE IN THE SHOW CONTROLLER"
    p "*" * 100
    p @sentences
    p "*" * 100

    @sentences = @sentences.long_parse #takes array, splits long sentences

    @pages = @sentences.size
    session[:book] = @book.id

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
    # to prevent guest user from being incremented in database
    @user_book.farthest_point = local_val if local_val > database_val

    save_point = @user_book.farthest_point if session[:user] != 1
    save_point = local_val if session[:user] == 1
    @user_book.save!

    bookmarks = []
    @user.bookmarks.each do |bookmark|
      bookmarks << bookmark.position_begin if bookmark.book_id == @book.id
    end

    render json: {farthest_point: save_point, bookmarks: bookmarks}.to_json
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
