class ChangeDefaultsInPlayers < ActiveRecord::Migration
  def change
    change_column :players, :state, :string, default: "not ready"
    change_column :players, :time_of_guess, :integer, default: 0
    remove_column :players, :name
  end
end
