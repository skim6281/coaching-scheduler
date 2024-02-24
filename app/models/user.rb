class User < ApplicationRecord
  self.inheritance_column = :role

  validates :name, presence: true
  validates :email, presence: true
end
