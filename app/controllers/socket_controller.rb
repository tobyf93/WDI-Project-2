class SocketController < WebsocketRails::BaseController
  # IMPORTANT: Don't override the initialize method.  Any socket setup should be
  # done in initialize_session.

  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def test
    WebsocketRails[:messages].trigger(:new, message[:message])
    # binding.pry
  end

  
end