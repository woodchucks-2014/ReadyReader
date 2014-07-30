class BooksController < ApplicationController

  include Tact_Token

  before_filter :check_for_mobile
  before_filter :prepare_for_mobile
  respond_to :json

  def show
    @book = Book.find(params[:id])
    @sentences = Book.includes(:sentences).limit(10)
    @sentences = @book.prep_for_dom
    @pages = @book.pages
    session[:book] = @book.id
    @user = User.find(params[:user_id])
    @comments = Comment.where(book_id: @book.id, user_id: @user.id)
  end

  def upload
    @user = User.find(params[:user_id])
    uploaded_io = params[:book]
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
    @book = Book.new
    @book.title = params[:title]
    @book.content = content
    @book.save!
    @user.books << @book
    Resque.enqueue(SentenceWorker, @book.id)
    redirect_to profile_path(@user), flash: {notice_upload: 'Book Successfully Uploaded :: Currently Processing'}
  end

  def check_point

    @user = User.find(session[:user]) # need to create guest user
    @book = Book.find(session[:book]) #Implement nesting to compensate for logging into multiple books.

    @user_book = UserBook.find_or_create_by(user_id: @user.id, book_id: @book.id)

    if @user_book.user_id == @user.id && @user_book.book_id == @book.id
      @user_book = @user_book
    else
      @user_book = UserBook.create(user_id: @user.id, book_id: @book.id)
    end

    database_val = @user_book.farthest_point #defaults to 0
    local_val = params["object"]["currentSentence"].to_i

    save_point = @user_book.local_storage_comp(@user.id, local_val)

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
    params.require(:book).permit(:title)
  end


end
