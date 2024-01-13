class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :unit, :recipe_id, :ordinal
end
