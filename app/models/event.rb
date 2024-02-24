class Event < ApplicationRecord
  belongs_to :student
  belongs_to :availability
  has_one :report
end
