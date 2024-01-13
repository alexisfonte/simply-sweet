class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :is_private, :user_id
end
