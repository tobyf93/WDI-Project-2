class AddPlayersLeftToGames < ActiveRecord::Migration
  def change
    add_column :games, :players_left, :integer
  end
end
