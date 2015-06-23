class GameSocketController < WebsocketRails::BaseController

  # This is waiting till the function end to publish to channel.  Would be good
  # if there was a way to flush channel before each sleep...
  # def start
  #   WebsocketRails[:game].trigger :start, 'beginning game'
  #   sleep(1.seconds)
  #   WebsocketRails[:game].trigger :start, '1 second passed on server'
  #   sleep(5.seconds)
  #   WebsocketRails[:game].trigger :start, 'finishing game'
  # end

  def start
    WebsocketRails[:game].trigger :start, 'Beginning game'
    round_start 1
  end

  def round_start round
    if round <= 3
      Thread.new do
        WebsocketRails[:game].trigger :start, "Starting round #{round}"
        start_round # We will need to rename these methods
        sleep(3.seconds)
        round_summary round
      end
    else
      WebsocketRails[:game].trigger :start, "Ending game"
    end
  end

  def round_summary round
    WebsocketRails[:game].trigger :start, "Round #{round} summary"
    sleep(3.seconds)
    round += 1
    self.round_start round
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

      if game.players.length < 1
        game.destroy
      else
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

    game.players_left = game.players.length
    game.save

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

    player = (Player.where({ :user_id => session[:user_id] }))
    player.first.state = "guessed"
    player.first.time_of_guess = message['time']
    player.first.guess = message['guess'].downcase
    player.first.save

    if correct_answer == message['guess'].downcase
      response = "You guessed correctly"
    else
      response = "You guessed WRONG! LOSER"
    end

    game.players_left = game.players_left - 1
    game.save

    if game.players_left == 0
      end_round
    end
  end

  def end_round
    game = Game.last

    WebsocketRails[:game].trigger :end_round
  end

  def get_score
    game = Game.last
    current_player = Player.where({ :user_id => session[:user_id] })

    current_guess = current_player.first.guess.downcase
    correct_answer = (Word.find game.word_id).name.downcase

    if current_guess == correct_answer
      score = (current_player.first.time_of_guess * 10)
      current_player.first.score += score
      current_player.first.save

      data = {
        response: "You guessed right!",
        score: score
      }

    else
      data = {
        response: "You guessed wrong...",
        score: 0 
      }
    end

    send_message :guess_response, data, :namespace => :game
  end
end
