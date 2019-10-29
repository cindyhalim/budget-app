class User < ApplicationRecord
  has_many :goals, dependent: :destroy
  has_many :transactions, dependent: :destroy
  has_secure_password 
  validates_presence_of :email
  validates_uniqueness_of :email
end
