class MessageSocketController < WebsocketRails::BaseController

  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def send
    WebsocketRails[:message].trigger :send, message
  end 
end
