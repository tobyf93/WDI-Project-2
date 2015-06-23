class GameSocketController < WebsocketRails::BaseController

  def start
    WebsocketRails[:game].trigger :start, 'beginning game'
    sleep(1.seconds)
    WebsocketRails[:game].trigger :start, '1 second passed on server'
    sleep(5.seconds)
    WebsocketRails[:game].trigger :start, 'finishing game'
  end

  def join
    game = Game.last
    game = Game.create if !game
    user = User.find session[:user_id]
    player = Player.find_by :user_id => user.id

    if !player
      player = Player.create :user_id => user.id
      game.players << player
    end

    users = game.players.map do |player|
      player.user
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
    data = {
      x_pos: message[:xPos],
      y_pos: message[:yPos],
      new_path: message[:newPath],
      stroke_color: message[:strokeColor],
      stroke_width: message[:strokeWidth]
    }

    WebsocketRails[:game].trigger :draw, data
  end

  def start_round
    game = Game.last
    game = Game.create if !game
    selected = false
    user = ""

    game.word_id = (Word.all).sample.id
    game.save

    game.players.each do |player|
      if player.has_drawn == false && selected == false
        player.state = "drawing"
        player.has_drawn = true
        player.save
        selected = true
        user = User.find player.user_id
      else
        player.state = "guessing"
        player.save
      end
    end

    if user == ""
      data = {
        message: "the game is over hoe."
      }

      WebsocketRails[:game].trigger :game_over, data
    else
      data = {
        username: (User.find user.id).username
      }

      # TODO: End the game if no player to draw was found.
      WebsocketRails[:game].trigger :start_round, data
    end    
  end

  def get_role
    game = Game.last
    game = Game.create if !game

    my_turn = false
    current_player = Player.where({ :user_id => session[:user_id] }) 

    if current_player.first.state == "drawing"
      my_turn = true
      this_word = Word.find game.word_id

      data = {
        my_turn: my_turn,
        word: this_word.name
      }

      send_message :my_turn, data, :namespace => :game
    else
      data = {
        my_turn: my_turn
      }

      send_message :not_turn, data, :namespace => :game
    end
  end

  def submit_guess
    game = Game.last
    correct_answer = (Word.find game.word_id).name.downcase

    if correct_answer == message.downcase
      response = "You guessed correctly"
    else
      response = "You guessed WRONG! LOSER"
    end
    send_message :guess_response, response, :namespace => :game
  end
end
