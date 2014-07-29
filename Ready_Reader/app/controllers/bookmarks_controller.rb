class BookmarksController < ApplicationController
  respond_to :json

  def mark
    p "*" * 100
    marker = params["marker"].to_i

    Bookmark.create(position_begin: marker, position_end: marker, 
                    book_id: session[:book], user_id: session[:user])

    render json: {bookmarks: [1,2,3]}.to_json
  end


end
