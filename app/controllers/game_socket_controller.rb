class GameSocketController < WebsocketRails::BaseController
  def join
    game = Game.last
    game = Game.create if !game

    # Checks that a player with the signed 
    if (Player.where ("user_id = #{session[:user_id]}")).empty?
      player = Player.create :user_id => session[:user_id]
      game.players << player
    end

    user = User.find session[:user_id]

    users = []
      game.players.each do |player|
        user = User.find player.user_id
        users.push user
      end

    players = game.players.pluck(:user_id).uniq
    data = {
      players: game.players,
      username: user.username,
      users: users
    }

    WebsocketRails[:game].trigger :join, data
  end

  def leave
    game = Game.last
    game = Game.create if !game



    if (Player.where ("user_id = #{session[:user_id]}")).any?
      # player = (Player.where ("user_id = #{session[:user_id]}"))
      # user = User.find session[:user_id]
      
      (Player.where ("user_id = #{session[:user_id]}")).destroy_all

      users = []
      game.players.each do |player|
        user = User.find player.user_id
        users.push user

      data = {
        username: 'A player',
        players: game.players,
        users: users
      }

      WebsocketRails[:game].trigger :leave, data
      end
    end
  end

  def draw
    # binding.pry
    response = "xPos = #{message[:xPos]} yPos = #{message[:yPos]}"
    data = {
      x_pos: message[:xPos],
      y_pos: message[:yPos],
      new_path: message[:newPath],
      stroke_color: message[:strokeColor],
      stroke_width: message[:strokeWidth]
    }

    WebsocketRails[:game].trigger :draw, data
  end
end
