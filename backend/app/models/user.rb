class User < ApplicationRecord
  has_secure_password
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password_confirmation, presence: true
  validates :password, :presence => true, :length => {:minimum => 8}
  validates :email, :presence => true, uniqueness: { case_sensitive: false }
  has_many :goals, dependent: :destroy
  has_many :transactions, dependent: :destroy
  has_and_belongs_to_many :badges
  has_secure_password 
end
