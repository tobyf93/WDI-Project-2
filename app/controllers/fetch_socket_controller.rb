class FetchSocketController < WebsocketRails::BaseController
  def players
    game = Game.last
    game = Game.create if !game
    players = game.players
    data = {
      players: game.players
    }

  end
end