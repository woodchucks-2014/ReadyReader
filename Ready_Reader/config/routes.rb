Rails.application.routes.draw do
  root 'users#index'
  get '/users/:id/sign_out', to: 'users#sign_out', as: :sign_out
  get '/users/login', to: 'users#existing', as: :users_login

  post '/users/login', to: 'users#login'
  get '/users/:id/profile', to: 'users#profile', as: :profile

  resources :users, except: :index do
    resources :books#, only: [:show, :delete, :new]
    post 'books/upload', to: 'books#upload'
    resources :comments
    get '/sentences.:format', to: 'books#show', as: :sentences, constraints: {:format => /json/}
  end

  post '/comment_on_book', to: 'comments#comment_on_book'
  post '/check_point', to: 'books#check_point'
  post '/bookmarks/mark', to: 'bookmarks#mark'

  get '/sentences.:format', to: 'sentences#sentences', as: :sentences, constraints: {:format => /json/}
end
