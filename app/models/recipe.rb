class Recipe < ApplicationRecord
    belongs_to :user
    has_many :ingredients
    has_many :directions
    has_many :favorites
    has_many :recipe_tags
    has_many :tags, through: :recipe_tags

    validates :title, presence: true
    validates :image_url, presence: true
    validates :is_private, inclusion: { in: [true, false] }
end
