class Avatar < ApplicationRecord
    has_many :users

    validates :name, presence: true
    validates :image_url, presence: true
end
