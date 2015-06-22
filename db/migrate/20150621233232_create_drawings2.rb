class CreateDrawings2 < ActiveRecord::Migration
  def change
    create_table :drawings do |t|
      t.text :name
      t.text :related_image

      t.timestamps
    end
  end
end
