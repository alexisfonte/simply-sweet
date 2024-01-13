class CreateDirections < ActiveRecord::Migration[7.0]
  def change
    create_table :directions do |t|
      t.text :direction, null: false
      t.integer :ordinal, null: false
      t.references :recipe, foreign_key: true, null: false

      t.timestamps
    end
  end
end
