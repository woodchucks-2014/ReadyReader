class UsersController < ApplicationController

  def index
    @book = Book.find(1)
    @pages = @book.pages
  end

  def profile
    user = User.find(params[:id])
    @books = user.books
  end

  def create
    @user = User.new(user_params(params))
    if @user.save
      session[:user] = @user.id
      redirect_to profile_path(@user)
    else
      redirect_to root_path, flash: {notice_signup: 'Invalid signup.'}
    end
  end

  def existing

  end

  def login
    p "*" * 100
    p "LOGIN INITIATED"
    @user = User.find_by(email: params[:user][:email])
    if @user && @user.authenticate(params[:user][:password])
      session[:user] = @user.id
      p "*" * 100
      p "SESSION INITIATED"
      redirect_to profile_path(@user)
    else
      redirect_to root_path, flash: {notice_login: 'Invalid credentials.' }
    end
  end

  def sign_out
    session.clear
    redirect_to :root
  end

  def show
    @user = User.find(params[:id])
  end

 private

  def user_params(params)
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
