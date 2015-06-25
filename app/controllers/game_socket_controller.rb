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

  def mike_debug data
    data = "#{Time.new} - #{data}"
    WebsocketRails[:game].trigger :mike, data
  end

  def _start
      game = Game.last

      WebsocketRails[:game].trigger :dictator, 'Beginning Game!'
      _start_round
  end

  def _start_round
    game = Game.last

      game.players.each do |player|
        player.state = "ready"
        player.has_drawn = false
        player.save
      end

      WebsocketRails[:game].trigger :dictator, "\tStarting Round"
      game.players.each { |player| start_phase }
      
      WebsocketRails[:game].trigger :dictator, "\tEnding Round"
      round_summary
  end

  # def _round_summary game, round
  #   WebsocketRails[:game].trigger :dictator, "\tRound Summary"
  #   # end_round

  #   game = round_summary game

  #   round += 1
  #   _start_round round
  # end

  # def _start_phase
  #   game = Game.last
  #   game.update :phase_start_time => Time.new

  #   start_phase

  # end

  # def _phase_summary
  # end

  private :_start, :_start_round, :_round_summary, :_start_phase, :_phase_summary
  ##############################################################################
  
  def initialize
    @game_start_delay = 0.seconds
    @no_of_rounds = 1
    @phase_time = 4.seconds
    @round_summary_time = 5.seconds
  end

  def mark_ready
    game = Game.last

    player = Player.find_by :user_id => session[:user_id]

    # Swaps the player state between ready and not ready.
    if player.state != "ready"
      player.update :state => "ready"
    else
      player.update :state => "not ready"
    end

    check_for_game_start

    player_states = game.players.map do |player|
      username = player.user.username

      {
        :player => player, 
        :username => username
      }
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
    game = Game.create unless game
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

  def start_phase
    game = Game.last
    game.update :word_id => Word.all.sample.id, :players_left => game.players.length

    game.players.update_all :state => 'guessing'
    drawer = game.players.find_by :has_drawn => false
    drawer.update :state => 'drawing', :has_drawn => true
    
    mike_debug("start_phase game object: #{game.to_json}")
    # begin 
    #   mike_debug(Game.last.to_json)
    # end until Game.last.word_id != last_word

    WebsocketRails[:game].trigger :dictator, "\t\t #{drawer.user.username} is drawing" 
    WebsocketRails[:game].trigger :tell_players_start   
  end

  def get_role
    # I don't know why this works.
      game = Game.last

      mike_debug("get_role game object: #{game.to_json}")
      
      # unless game.word_id
      #   word = Word.all.sample
      #   game.update :word_id => word.id
      # end

      current_player = game.players.find_by :user_id => session[:user_id] 

      data = { :my_turn => false }
      if current_player.state == "drawing"
        word = Word.find game.word_id

        data[:my_turn] = true
        data[:word] = word.name  
      end

      send_message :my_turn, data, :namespace => :game
  end

  def submit_guess
    game = Game.last

    correct_answer = (Word.find game.word_id).name.downcase

    mike_debug("This guess was submitted: #{message['guess']}")

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

    mike_debug("The response to that guess was: #{response}")
    # TODO: Currently players_left is not set at the start of a round.
    # game.update :players_left => (game.players_left - 1)

    send_message :guess_response, response, :namespace => :game

    game.update :players_left => (game.players_left - 1)

    if game.players_left == 0
      #TODO Go to the next phase.
    end

  end

  def round_summary
    game = Game.last

    mike_debug("Starting the round summary")
    
    scores = []
    sorted_by_score = game.players
    sorted_by_score.sort_by { |player| player.score }

    mike_debug(sorted_by_score)

    sorted_by_score.each do |player|
      username = player.user.username
      scores.push({ username: username, score: player.score, })
    end

    mike_debug(scores)

    game.update :word_id => nil
    game.players.each do |player|
      player.update :has_drawn => false
    end

    mike_debug(game.word_id)

    WebsocketRails[:game].trigger :game_over, scores

  end


  # I think this function is useless.
  # def end_round
  #   game = Game.last

  #   WebsocketRails[:game].trigger :end_round
  # end

  # def get_score
  #   game = Game.last
  #   current_player = Player.where({ :user_id => session[:user_id] })

  #   current_guess = current_player.first.guess.downcase
  #   correct_answer = (Word.find game.word_id).name.downcase

  #   if current_guess == correct_answer
  #     time_difference = current_player.first.time_of_guess - game.phase_start_time
  #     score = (time_difference * 10)
  #     current_player.first.score += score
  #     current_player.first.save

  #     data = {
  #       response: "You guessed right!",
  #       score: score
  #     }

  #   else
  #     data = {
  #       response: "You guessed wrong...",
  #       score: 0 
  #     }
  #   end

  #   send_message :guess_response, data, :namespace => :game
  # end
end
