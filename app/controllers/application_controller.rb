class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
    
  private 
  def authenticate
    if session[:user_id]
      @current_user = User.find session[:user_id]
    else
      respond_to do |format|
        format.html { redirect_to login_path, notice: 'Please log in to access Drawsome.' }
      end
    end

  end
end
