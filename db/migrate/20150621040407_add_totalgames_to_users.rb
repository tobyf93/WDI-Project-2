class AddTotalgamesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :total_games, :integer, default: 0
  end
end
