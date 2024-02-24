class Coach < User
  has_many :availabilities
  has_many :events, through: :availabilities
  has_many :reports, through: :events
end