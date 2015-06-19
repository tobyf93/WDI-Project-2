class SocketController < WebsocketRails::BaseController
  # IMPORTANT: Don't override the initialize method.  Any socket setup should be
  # done in initialize_session.

  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def test
    # require 'pry'

    WebsocketRails[:messages].trigger(:new, message[:message])
    # send_message :test_response, "Hi!  I'm the server :)"
    # send_message :test_response, "I can send you messages without you asking for it!"

    # binding.pry
  end
end