class AddFarthestPointToBook < ActiveRecord::Migration
  def change
    add_column :books, :farthest_point, :int, :default => 0
  end
end
