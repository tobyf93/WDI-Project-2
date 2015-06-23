class AddGuessToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :guess, :string
  end
end
