module UsersHelper

  def current_user
    @user ||= User.find(session[:user]) if session[:user]
  end

  def logged_in?
    current_user
  end

end
