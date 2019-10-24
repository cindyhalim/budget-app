class User < ApplicationRecord
  has_many :goals, dependent: :destroy
  has_many :transactions, dependent: :destroy
end
