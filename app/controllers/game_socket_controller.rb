class GameSocketController < WebsocketRails::BaseController
  def join
    game = Game.last

    response = "Player #{message[:name]} has joined the game"
    WebsocketRails[:game].trigger :add_player, response
  end

  def leave
    response = "Player #{message[:name]} has left the game"
    WebsocketRails[:game].trigger :remove_player, response
  end
end
