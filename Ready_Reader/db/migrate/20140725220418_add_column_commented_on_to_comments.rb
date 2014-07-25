class AddColumnCommentedOnToComments < ActiveRecord::Migration
  def change
    add_column :comments, :commented_on, :text
  end
end
