class MessageSocketController < WebsocketRails::BaseController

  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def transmit
    WebsocketRails[:message].trigger(:transmit, message)
  end 
end
