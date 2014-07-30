class CreateSentences < ActiveRecord::Migration
  def change
    create_table :sentences do |t|
      t.text :content
      t.belongs_to :book

      t.timestamps
    end
  end
end
