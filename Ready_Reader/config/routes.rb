Rails.application.routes.draw do
  root 'users#index'
  get '/users/:id/sign_out', to: 'users#sign_out', as: :sign_out
  get '/users/login', to: 'users#existing', as: :users_login

  post '/users/login', to: 'users#login'
  get '/users/:id/profile', to: 'users#profile', as: :profile

  resources :users, only: [:new, :create, :destroy, :update, :edit] do
    resources :books, only: [:show, :delete, :new]
    post 'books/upload', to: 'books#upload'
    resources :comments
  end

  post '/comment_on_book', to: 'comments#comment_on_book'

  post '/check_point', to: 'books#check_point'

end
