class CreateFavorites < ActiveRecord::Migration[7.0]
  def change
    create_table :favorites do |t|
      t.references :user, foreign_key: true, null: false
      t.references :recipe, foreign_key: true, null: false

      t.timestamps
    end
  end
end
