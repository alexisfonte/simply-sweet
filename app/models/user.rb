class User < ApplicationRecord
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true

    belongs_to :avatar, optional: true
    has_many :recipes
    has_many :favorites
    has_many :favorited_recipes, through: :favorites, source: :recipe
end
