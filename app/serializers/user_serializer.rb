class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar, :likes
  has_one :avatar
  has_many :recipes
  has_many :favorited_recipes

  def likes
    object.total_likes
  end

end
