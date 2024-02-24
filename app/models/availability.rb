class Availability < ApplicationRecord
  belongs_to :coach
  has_one :event
  
  before_validation :set_end_time
  validates :start_time, presence: true
  validate :validate_no_intersection_with_other_availabilities
  
  private

  def set_end_time
    self.end_time = start_time + 2.hours if start_time.present?
  end

  def validate_no_intersection_with_other_availabilities
    if coach.availabilities.where("(start_time <= ? AND end_time >= ?) OR (start_time >= ? AND start_time <= ?)", start_time, start_time, start_time, end_time).any?
      errors.add(:base, "Availability intersects with another availability")
    end
  end
  
end
