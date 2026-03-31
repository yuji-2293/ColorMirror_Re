class Color < ApplicationRecord
  belongs_to :user
  has_one :response, dependent: :destroy
end
