class AddTimeOfGuessToGames < ActiveRecord::Migration
  def change
    add_column :games, :phase_start_time, :datetime
    add_column :players, :guess_time, :datetime
  end
end
