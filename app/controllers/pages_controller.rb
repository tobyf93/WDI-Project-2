class PagesController < ApplicationController
  before_action :authenticate

  def socketdemo
  end

  def gamestate
  end

  def app
  end

  def loaddrawing
  end

  def test
    game = Game.last
    game = Game.create if !game

    my_turn = false
    
    current_player = Player.where ("user_id = #{session[:user_id]}") 

    if current_player.state == "drawing"
      my_turn = true

      data = {
        my_turn: my_turn
      }

      send_message :my_turn, data, :namespace => :game
    else
      data = {
        my_turn: my_turn
      }
      send_message :not_turn, data, :namespace => :game
    end
  end

end
