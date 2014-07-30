class CreateBooks < ActiveRecord::Migration

  def change
    create_table :books do |t|
      t.string :title
      t.text :content
      t.belongs_to :user, index: true
      t.boolean :universal, default: false

      t.timestamps
    end
  end
end
