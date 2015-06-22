class ChangeWordidToInteger < ActiveRecord::Migration
  def change
    remove_column :hints, :word_id
    add_column :hints, :word_id, :integer
  end
end
