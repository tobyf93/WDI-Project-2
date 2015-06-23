class AddWordidToGame < ActiveRecord::Migration
  def change
    add_column :games, :word_id, :integer
  end
end
