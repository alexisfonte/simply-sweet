class DirectionSerializer < ActiveModel::Serializer
  attributes :id, :direction, :ordinal, :recipe_id
end
