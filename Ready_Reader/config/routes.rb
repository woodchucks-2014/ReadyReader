Rails.application.routes.draw do
  root 'users#index'
  get '/users/:id/sign_out', to: 'users#sign_out', as: :sign_out

  post '/users/login', to: 'users#login'
  get '/users/:id/profile', to: 'users#profile', as: :profile

  resources :users, only: [:new, :destroy, :update, :edit] do
    resources :books, only: [:show, :delete, :new]
    post 'books/upload', to: 'books#upload'
    resources :comments
  end

end
