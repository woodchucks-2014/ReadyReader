class CommentsController < ApplicationController

  def new
  end

  def comment_on_book
    p "*" * 100
    @user = User.find(session[:user])
    @book = Book.find(session[:book])
    @comment = Comment.create(user_id: @user.id, book_id: @book.id, commentary: params["commentary"], commented_on: params["commented_on"])
    redirect_to user_book_path(@user, session[:book])
  end


  private
  def commentary_params(params)
    params.permit(:user_id, :book_id, :commentary, :commented_on)
  end
end
