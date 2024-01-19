class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :is_private, :author, :favorites, :like_by_user
  has_many :ingredients
  has_many :directions
  has_many :favorites

  def favorites
    object.favorites.length
  end

  def author
    {id: object.user.id, username: object.user.username, avatar_url: object.user.avatar.image_url}
  end

  def like_by_user
    if current_user
      Favorite.where(user_id: current_user.id, recipe_id: object.id)
    else
      false
    end
  end

end
