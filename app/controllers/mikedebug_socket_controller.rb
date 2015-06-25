class MikedebugSocketController < WebsocketRails::BaseController

  def current_status
    WebsocketRails[:mikedebug].trigger :mikedebug, message
  end

end