class AddTimeOfGuessToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :time_of_guess, :integer
  end
end
