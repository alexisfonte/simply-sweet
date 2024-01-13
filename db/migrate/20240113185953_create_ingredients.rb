class CreateIngredients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredients do |t|
      t.string :name, null: false
      t.float :amount, null: false
      t.string :unit, null: false
      t.integer :ordinal, null: false
      t.references :recipe, foreign_key: true, null: false

      t.timestamps
    end
  end
end
