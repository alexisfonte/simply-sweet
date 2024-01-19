class ChangeAmountToBeStringInIngredients < ActiveRecord::Migration[7.0]
  def change
    change_column :ingredients, :amount, :string
  end
end
