class BooksController < ApplicationController

  include Tact_Token

  before_filter :check_for_mobile
  before_filter :prepare_for_mobile
  respond_to :json

  def show
    @book = Book.find(params[:id])

    @sentences = @book.prep_for_dom
    p "*" * 100
    p @sentences
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

    book = Book.create(title: params[:title], content: content)
    @user.books << book

    content_array = tokenize_special(book.content)
    content_array.each do |sentence|
      Sentence.create(book_id: book.id, content: sentence)
    end

    redirect_to profile_path(@user)
  end

  def check_point

    @user = User.find(session[:user]) # need to create guest user
    @book = Book.find(session[:book]) #Implement nesting to compensate for logging into multiple books.

    @user_book = UserBook.find_or_create_by(user_id: @user.id, book_id: @book.id)


    database_val = @user_book.farthest_point #defaults to 0
    p "*"*100
    p params
    p "*"*100

    local_val = 0

    #prevent overwriting
    if (params["object"]["userName"] + params["object"]["bookId"]).gsub(" ", "") == @user.name + @book.id.to_s
      local_val = params["object"]["currentSentence"].to_i
    end

    p "THIS IS THE LOCAL VAL"
    p local_val

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
    params.require(:book).permit(:title, :content)
  end


end
