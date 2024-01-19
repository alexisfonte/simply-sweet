class Recipe < ApplicationRecord
    belongs_to :user
    has_many :ingredients, dependent: :destroy
    has_many :directions, dependent: :destroy
    has_many :favorites, dependent: :destroy

    validates :title, presence: true
    validates :image_url, presence: true
    validates :is_private, inclusion: { in: [true, false] }

    accepts_nested_attributes_for :ingredients, allow_destroy: true
    accepts_nested_attributes_for :directions, allow_destroy: true

end
