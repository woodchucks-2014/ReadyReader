class BookmarksController < ApplicationController
  respond_to :json

  def mark
    p "*" * 100
    marker = params["marker"].to_i

    Bookmark.create(position_begin: marker, position_end: marker, 
                    book_id: session[:book], user_id: session[:user])


    bookmark_holder = []

    user_bookmarks = User.find(session[:user]).bookmarks
    user_bookmarks.each do |bookmark|
      if bookmark.book_id == session[:book]
        bookmark_holder << bookmark.position_begin
      end
    end
    
    render json: { bookmarks: bookmark_holder.uniq  }.to_json
  end


end
