class RecreateUsers < ActiveRecord::Migration
  def change
    drop_table :users

    create_table :users do |t|
      t.string :username
      t.text :password_digest
      t.text :email
      t.boolean :admin, :default => false
      t.text :bio
      t.text :profile_image, :default => 'https://tracker.moodle.org/secure/attachment/30912/f3.png'
      t.integer :total_wins, :default => 0

      t.timestamps
    end
  end
end
