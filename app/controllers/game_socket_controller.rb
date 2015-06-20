class GameSocketController < WebsocketRails::BaseController
  def join
    game = Game.last
    game = Game.create if !game

    player = Player.create :name => message[:name]
    game.players << player
    players = game.players.pluck(:name).uniq

    response = "Players: #{players}"
    WebsocketRails[:game].trigger :add_player, response
  end

  def leave
    game = Game.last
    game = Game.create if !game

    Player.where(:name => message[:name]).destroy_all
    players = game.players.pluck(:name).uniq

    response = "Players: #{players}"
    WebsocketRails[:game].trigger :remove_player, response
  end
end
