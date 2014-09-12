class SentencesController < ApplicationController
	def sentences
		@book = Book.find(session[:book])
		@sentences = @book.dom
		render json: {sentences: @sentences}.to_json
	end
end