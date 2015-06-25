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

  def select_game_host
    game = Game.last

    host_id = game.players.pluck(:user_id).sample

    data = {
      :host_id => host_id,
      :players => game.players.length
    }
    # WebsocketRails[:game].trigger :dictator, "User #{user_id} is the host"
    WebsocketRails[:game].trigger :host, data
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
      select_game_host
    end
  end

  def join
    game = Game.last
    game = Game.create unless game
    game.update :state => "pregame" unless game.state

    if game.state == "pregame"
      user = User.find session[:user_id]
      player = user.players.first

      if !player
        # Restrict user to one player for now
        Player.where(:user_id => user.id).destroy_all

        player = Player.create :user_id => user.id
        game.players << player
      end

      data = game.players.map do |player|
        username = player.user.username

        {
          :player => player, 
          :username => username
        }
      end

      WebsocketRails[:game].trigger :join, data
    end
  end

  def leave
    game = Game.last

    if (Player.where ({ :user_id => session[:user_id] })).any?
      (Player.where ({ :user_id => session[:user_id] })).destroy_all

      if game.players.length < 1
        game.destroy
      else
        data = []

        data = game.players.map do |player|
          username = player.user.username
          {
          :player => player, 
          :username => username
          }
        end
        
        WebsocketRails[:game].trigger :leave, data
      end
    end
  end

  def draw

    # requester = Player.find_by :user_id => session[:user]

    # if requester.state == "drawing" 
      data = {
        x_pos: message[:xPos],
        y_pos: message[:yPos],
        new_path: message[:newPath],
        stroke_color: message[:strokeColor],
        stroke_width: message[:strokeWidth]
      }
      WebsocketRails[:game].trigger :draw, data
    # end

  end

  def start_round
    game = Game.last
    game.update :state => "in_progress"

    game.players.each do |player|
      player.update :state => "ready", :has_drawn => false, :guess => "", :score => 0, :guess_time => nil
    end
  end

  def start_phase
    game = Game.last
    game.update :word_id => Word.all.sample.id, :players_left => game.players.length, :phase_start_time => Time.new

    game.players.update_all :state => 'guessing', :guess => ""
    drawer = game.players.find_by :has_drawn => false
    drawer.update :state => 'drawing', :has_drawn => true

    WebsocketRails[:game].trigger :dictator, "\t\t #{drawer.user.username} is drawing" 
    WebsocketRails[:game].trigger :tell_players_start
  end

  def get_role
    game = Game.last

    current_player = game.players.find_by :user_id => session[:user_id] 

    data = { :my_turn => false }

    if current_player.state == "drawing"
      word = Word.find game.word_id
      data[:my_turn] = true
      data[:word] = word.name

      mike_debug("The word is #{word.name}, you cheating piece of shit")
    end

    send_message :my_turn, data, :namespace => :game
  end

  def submit_guess
    game = Game.last

    correct_answer = (Word.find game.word_id).name.downcase

    mike_debug("This guess was submitted: #{message['guess']}")
    mike_debug("The correct word is #{correct_answer}")

    player = (Player.where({ :user_id => session[:user_id] }))
    player.first.update :state => "guessed", :time_of_guess => Time.new, :guess => message['guess'].downcase

    score = 0
    time_dif = (player.first.time_of_guess.to_i) - (game.phase_start_time.to_i)

    score = (10000 / time_dif) if player.first.guess == correct_answer

    player.first.update :score => (player.first.score + score)

    time = Time.new.strftime("%I:%M:%S %P")
    user = User.find session[:user_id]

    data = {
      username: user.username,
      time: time
    }

    WebsocketRails[:game].trigger :guess_response, data

  end

  def phase_summary
    game = Game.last

    game.update :players_left => (game.players_left - 1)
    
    scores = []
    sorted_by_score = game.players
    sorted_by_score.sort_by { |player| player.score }

    mike_debug(sorted_by_score)

    sorted_by_score.each do |player|
      username = player.user.username
      scores.push({ username: username, player: player })
    end

    WebsocketRails[:game].trigger :game_over, scores
  end

  def round_summary
    ## WHATEVER WE WANT TO HAPPEN AT THE END OF THE GAME.
  end
end
