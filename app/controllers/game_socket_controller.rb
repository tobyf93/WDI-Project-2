class GameSocketController < WebsocketRails::BaseController
  def join
    game = Game.last
    game = Game.create if !game

    player = Player.create :name => message[:name]
    game.players << player
    players = game.players.pluck(:name).uniq

    WebsocketRails[:game].trigger :add_player, players
  end

  def leave
    game = Game.last
    game = Game.create if !game

    Player.where(:name => message[:name]).destroy_all
    players = game.players.pluck(:name).uniq

    WebsocketRails[:game].trigger :remove_player, players
  end

  def draw
    # binding.pry
    response = "xPos = #{message[:xPos]} yPos = #{message[:yPos]}"
    data = {
      x_pos: message[:xPos],
      y_pos: message[:yPos],
      new_path: message[:newPath],
      stroke_color: message[:strokeColor]
    }

    WebsocketRails[:game].trigger :draw, data
  end
end
