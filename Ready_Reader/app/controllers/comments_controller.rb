class CommentsController < ApplicationController
  def new

  end

  def create
    p "*" * 100
    @user = User.find(params["comment"]["user_id"])
    p "*" * 100
    p "EXECUTED"

    @comment = Comment.create(commentary_params(params["comment"]))
    respond_to do |format|
      # format.html{redirect_to books_path(book.id)}
      format.js
    end
  end


  private
  def commentary_params(params)
    params.permit(:user_id, :book_id, :commentary, :commented_on)
  end
end
