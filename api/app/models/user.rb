class User < ApplicationRecord
  self.table_name = 'user'
  has_many :keyword
  validates :uid, presence: true, uniqueness: true
end
