class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
    
  private 
  def authenticate
    # raise 'hello'
    @current_user = User.find_by :id => session[:user_id] if session[:user_id]
    session[:user_id] = nil unless @current_user

    if !@current_user
      respond_to do |format|
        format.html { redirect_to login_path, notice: 'Please log in to access Drawsome.' }
      end
    end
  end
end
