class AddColumnCommentedOnToComments < ActiveRecord::Migration
  def change
    add_column :comments, :commmented_on, :text
  end
end
