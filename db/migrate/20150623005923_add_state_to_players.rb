class AddStateToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :state, :string
  end
end
