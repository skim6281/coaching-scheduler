class Student < User
  has_many :events
  has_many :availabilities, through: :events
end