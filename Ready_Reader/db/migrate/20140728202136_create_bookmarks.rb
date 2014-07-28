class CreateBookmarks < ActiveRecord::Migration
  def change
    create_table :bookmarks do |t|
      t.belongs_to :user, index: true
      t.belongs_to :book, index: true
      t.integer :position_begin
      t.integer :position_end

      t.timestamps
    end
  end
end
