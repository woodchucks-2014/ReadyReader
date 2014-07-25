Rails.application.routes.draw do

  post '/users/login', to: 'users#login'
  get '/users/:id/sign_out', to: 'users#sign_out', as: :sign_out

  resources :users do
    resources :books, only: [:show, :delete, :new]
    post 'books/upload', to: 'books#upload'
    resources :comments
  end

end
