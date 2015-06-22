class ChangeDrawingidToWordid < ActiveRecord::Migration
  def change
    rename_column :hints, :drawing_id, :word_id
  end
end
