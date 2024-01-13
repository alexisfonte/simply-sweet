class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :title, null: false
      t.string :image_url, null: false
      t.boolean :is_private, default: false
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
