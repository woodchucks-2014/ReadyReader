class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :commentary
      t.belongs_to :user, index: true
      t.belongs_to :book, index: true

      t.timestamps
    end
  end
end
