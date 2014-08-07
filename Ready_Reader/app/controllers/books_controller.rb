class BooksController < ApplicationController

  include Tact_Token

  before_filter :check_for_mobile
  before_filter :prepare_for_mobile
  respond_to :json

  def show
    @book = Book.find(params[:id])
    # @sentences = Book.includes(:sentences).limit(10)
    @sentences = @book.dom
    p "*"*100
    p @sentences.size
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
    @user = User.find(session[:user])
    @book = Book.find(session[:book])

    #to create or find existing UserBook excluding promo book
    @user_book = UserBook.find_or_create_by(user_id: @user.id, book_id: @book.id) if @book.id != 1
    #to accomodate promo book
    if @book.id == 1
      @user_book = UserBook.find_or_create_by(user_id: 1, book_id: 1)
    end

    #default to 0
    database_val = @user_book.farthest_point
    local_val = 0

    #prevent overwriting through unique key lookup
    if (params["object"]["userName"] + params["object"]["bookId"]).gsub(" ", "") == @user.name + @book.id.to_s
      local_val = params["object"]["currentSentence"].to_i
    end

    #make comparison and reset if necessary
    @user_book.farthest_point = local_val if local_val > database_val
    @user_book.save!

    #prevent max out
    if @user_book.farthest_point > @book.pages
      @user_book.farthest_point = @book.pages #max in DB
      @user_book.save! #save in DB
    end

    save_point = @user_book.farthest_point #if LS has incremented up
    save_point = local_val if @user.id == 1 #in order to avoid saving to DB

    bookmarks = []
    @user.bookmarks.each do |bookmark|
      bookmarks << bookmark.position_begin if bookmark.book_id == @book.id
    end

    render json: {farthest_point: save_point, bookmarks: bookmarks}.to_json
  end

  def delete
    @user = User.find(session[:user])
    @book = Book.find(session[:book])
    @book.destroy
    redirect_to profile_path(@user)
  end

  private

  def book_params(params)
    params.require(:book).permit(:title)
  end

end
