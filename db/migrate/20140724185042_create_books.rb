class CreateBooks < ActiveRecord::Migration

  #execute "create extension hstore"

  def change
    create_table :books do |t|
      t.string :title
      t.text :content
      t.text :sentences, array: true, default: []
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
