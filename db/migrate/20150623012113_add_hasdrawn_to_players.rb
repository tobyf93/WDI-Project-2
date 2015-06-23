class AddHasdrawnToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :has_drawn, :boolean, default: false
  end
end
