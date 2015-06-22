class CreateDrawings < ActiveRecord::Migration
  def change
    create_table :hints do |t|
      t.text :name
      t.text :drawing_id

      t.timestamps
    end
  end
end
