class UsersController < ApplicationController

  def index

  end

  def create
    @user = User.new(user_params(params))
    if @user.save
      session[:user] = @user.id
      redirect_to user_ratings_path(@user), flash: {notice: 'Successful log in!'}
    else
      redirect_to new_user_path, flash: {notice: 'Invalid signup.'}
    end
  end

  def login
    p "*" * 100
    p "LOGIN INITIATED"
    @user = User.find_by(email: params[:user][:email])
    if @user && @user.authenticate(params[:user][:password])
      session[:user] = @user.id
      p "*" * 100
      p "SESSION INITIATED"
      redirect_to profile_path(@user), flash: {notice: "Successful log in!"}
    else
      redirect_to root_path, flash: {notice: 'Invalid credentials!' }
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
