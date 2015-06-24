class MessageSocketController < WebsocketRails::BaseController

  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def transmit

    user = User.find session[:user_id]
    currtime = Time.new.strftime("%I:%M:%S %P")

    chatobj = {
      user: user.username.capitalize,
      currtime: currtime,
      message: message
    }
    WebsocketRails[:message].trigger(:transmit, chatobj)
  end 
end
