class AddHighestToGames < ActiveRecord::Migration
  def change
    add_column :games, :highest_score, :integer, default: 0
  end
end
