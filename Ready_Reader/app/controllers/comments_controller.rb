class CommentsController < ApplicationController
  respond_to :json
  include CommentsHelper

  def new
  end

  def comment_on_book
    p "*" * 100
    @user = User.find(session[:user])
    @book = Book.find(session[:book])
    @comment = Comment.create(user_id: @user.id, book_id: @book.id, commentary: params["commentary"], commented_on: params["commented_on"])
    p "NEARING JSON REQUEST"
    render json: {passage: @comment.commented_on, comment: @comment.commentary, datetime: datetime_am_pm(@comment.created_at), author: @user.name}.to_json
  end


  private
  def commentary_params(params)
    params.permit(:user_id, :book_id, :commentary, :commented_on)
  end
end
