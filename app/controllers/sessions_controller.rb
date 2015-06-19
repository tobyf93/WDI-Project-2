class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by :name => params[:name]
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      gon.user = user
      redirect_to '/app'

    else

      flash[:notice] = "Invalid login, please try again."
      redirect_to '/'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end
end
