class GameSocketController < WebsocketRails::BaseController
  ##############################################################################
  # Game Dictator
  ##############################################################################
  # start     Begins a game with X rounds.

  # round     Initially called by start.  A round consists of X phases where X
  #           is the number of players in the game.

  # phase     A phase consists of a single player drawing a given word and the
  #           remaining players submiting guesses based on the realtime drawing.

  def toby_debug data
    data = "#{Time.new} - #{data}"
    WebsocketRails[:game].trigger :toby, data
  end

  def _start
    Thread.new do
      game = Game.last

      sleep(@game_start_delay)
      WebsocketRails[:game].trigger :dictator, 'Beginning Game!'
      _start_round game, 1
    end
  end

  def _start_round game, round
    if round <= @no_of_rounds

      game.players.each do |player|
        player.state = "ready"
        player.has_drawn = false
        player.save
      end

      WebsocketRails[:game].trigger :dictator, "\tStarting Round #{round}"
      game.players.each { |player| _start_phase player }
      
      WebsocketRails[:game].trigger :dictator, "\tEnding Round #{round}"
      _round_summary game, round
    else
      WebsocketRails[:game].trigger :dictator, "Ending Game"
    end
  end

  def _round_summary game, round
    WebsocketRails[:game].trigger :dictator, "\tRound #{round} Summary"
    # end_round

    game = round_summary game

    sleep(@round_summary_time)

    round += 1
    _start_round game, round
  end

  def _start_phase player
    game = player.game
    game.phase_start_time = Time.new
    game.save

    start_phase game

    WebsocketRails[:game].trigger :tell_players_start

    sleep(@phase_time)
  end

  def _phase_summary
  end

  private :_start, :_start_round, :_round_summary, :_start_phase, :_phase_summary
  ##############################################################################
  
  def initialize
    @game_start_delay = 0.seconds
    @no_of_rounds = 1
    @phase_time = 10.seconds
    @round_summary_time = 5.seconds
  end

  def mark_ready
    game = Game.last

    player = Player.where({ :user_id => session[:user_id] }).first

    # Swaps the player state between ready and not ready.
    if player.state != "ready"
      player.state = "ready"
    else
      player.state = "not ready"
    end
    player.save

    check_for_game_start

    player_states = [] 

    game.players.each do |player|
      username = (User.find player.user_id).username
      player_states.push({:player => player, :username => username})
    end
    WebsocketRails[:game].trigger :player_states, player_states
  end

  def check_for_game_start
    game = Game.last

    allReady = true

    game.players.each do |player|
      if player.state != "ready"
        allReady = false
      end
    end

    if game.players.length >= 2 && allReady
      _start
    end
  end

  def join
    game = Game.last
    game = Game.create if !game
    user = User.find session[:user_id]
    player = user.players.first

    if !player
      # Restrict user to one player for now
      Player.where(:user_id => user.id).destroy_all

      player = Player.create :user_id => user.id
      game.players << player
    end

    users = game.players.map { |player| player.user }

    data = game.players.map do |player|
      {
        player: player.id,
        username: player.user.username
      }
    end

    WebsocketRails[:game].trigger :join, data
  end

  def leave
    game = Game.last

    if (Player.where ({ :user_id => session[:user_id] })).any?
      (Player.where ({ :user_id => session[:user_id] })).destroy_all

      if game.players.length < 1
        game.destroy
      else
        data = []

        game.players.each do |player|
          data.push ({
            player: player,
            username: (User.find player.user_id).username
          })
        
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

  def start_phase game
    game.players.update_all :state => 'guessing'
    drawer = game.players.find_by :has_drawn => false

    WebsocketRails[:game].trigger :dictator, "\t\t #{drawer.user.username} is drawing"

    drawer.update :state => 'drawing'
  end

  def get_role
    game = Game.last

    unless game.word_id
      word = Word.all.sample
      game.word_id = word.id
      game.save
      toby_debug("Selected #{word.name}")
    end

    current_player = game.players.where :user_id => session[:user_id] 

    if current_player.first.state == "drawing"
      # my_turn = true
      # this_word = Word.find game.word_id
      kal = Word.find( game.word_id ) if game && game.word_id
      data = {
        my_turn: true,
        word: kal.name || "NO WORD FOUND"

        # word: this_word.name
      }
      send_message :my_turn, data, :namespace => :game
    else
      data = {
        my_turn: false
      }
      send_message :my_turn, data, :namespace => :game
    end
  end

  def submit_guess
    game = Game.last
    correct_answer = (Word.find game.word_id).name.downcase

    player = (Player.where({ :user_id => session[:user_id] }))
    player.first.state = "guessed"
    player.first.time_of_guess = Time.new
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

  def round_summary game
    
    scores = []
    sorted_by_score = game.players.sort_by &:score

    sorted_by_score.each do |player|
      username = player.user.username
      scores.push({ username: username, score: player.score, })
    end

    if game.word_id
      game.word_id = nil
      game.save
      game.players.each do |player|
        player.has_drawn = false
        player.save
      end
    end

    WebsocketRails[:game].trigger :game_over, scores

    return game
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
      time_difference = current_player.first.time_of_guess - game.phase_start_time
      score = (time_difference * 10)
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
