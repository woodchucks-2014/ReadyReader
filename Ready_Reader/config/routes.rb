Rails.application.routes.draw do

  resources :books, only: [:show, :delete, :new]
  post 'books/upload', to: 'books#upload'

  resources :comments

end
