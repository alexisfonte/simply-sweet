class CreateRecipeTags < ActiveRecord::Migration[7.0]
  def change
    create_table :recipe_tags do |t|
      t.references :recipe, foreign_key: true, null: false
      t.references :tag, foreign_key: true, null: false

      t.timestamps
    end
  end
end
