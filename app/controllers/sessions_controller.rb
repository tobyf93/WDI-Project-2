class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by :username => params[:username]
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to :app
    else
      flash[:notice] = "Invalid login, please try again."
      redirect_to :root
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :root
  end
end
