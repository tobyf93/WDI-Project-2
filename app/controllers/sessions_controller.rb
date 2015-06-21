class SessionsController < ApplicationController
  include SessionsHelper

  def new
  end

  def create
    user = User.find_by :username => params[:username]
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      if params[:remember_me]["validated"].to_i == 1
        remember user
      else
        forget user
      end
      redirect_to :app
    else
      flash[:notice] = "Invalid login, please try again."
      redirect_to :root
    end
  end

  # This method is linked to the remember method in the users controller which creates a random hash as a token to remember a user in the app.
  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # This method determines whether a session is defined by the remember_token and cookie or just by a new user signing in.
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to :root
  end
end
