class RenameDrawingsToWords < ActiveRecord::Migration
  def change
    rename_table :drawings, :words
  end
end
