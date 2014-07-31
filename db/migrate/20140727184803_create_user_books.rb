class CreateUserBooks < ActiveRecord::Migration
  def change
    create_table :user_books do |t|
      t.integer :farthest_point, default: 0
      t.belongs_to :user
      t.belongs_to :book

      t.timestamps
    end
  end
end
