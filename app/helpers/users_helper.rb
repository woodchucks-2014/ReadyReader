module UsersHelper

  include Tact_Token

  def current_user
    @user ||= User.find(session[:user]) if session[:user]
  end

  def logged_in?
    return false if session[:user] == 1
    current_user
  end

end
