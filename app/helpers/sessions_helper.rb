module SessionsHelper

  # This helper method deletes the cookies associated with a user if they log out.
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  # This helper method deletes all the relevant user data when a user logs out.
  def log_out
    forget(current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  # This method just checks if someone is logged in.
  def logged_in?
    !current_user.nil?
  end

end
