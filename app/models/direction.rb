class Direction < ApplicationRecord
    belongs_to :recipe

    validates :direction, presence: true
    validates :ordinal, presence: true
end
