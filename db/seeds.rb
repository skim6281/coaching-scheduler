# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

obi = Coach.create(name: "Obi-Wan Kenobi", email: "obi@jedi.com")
yoda = Coach.create(name: "Yoda", email: "yoda@jedi.com")
mace = Coach.create(name: "Mace Windu", email: "mace@jedi.com")

ani = Student.create(name: "Anakin Skywalker", email: "ani@jedi.com")
luke = Student.create(name: "Luke Skywalker", email: "luke@jedi.com")
grogu = Student.create(name: "Grogu", email: "mando@jedi.com")

a1 = Availability.create(coach: obi, start_time: (DateTime.now - 1).days_ago(10))
a2 = Availability.create(coach: obi, start_time: (DateTime.now - 1).days_ago(1))
a3 = Availability.create(coach: obi, start_time: 30.minutes.ago)
a4 = Availability.create(coach: obi, start_time: DateTime.now.tomorrow)
a5 = Availability.create(coach: mace, start_time: DateTime.now.days_ago(1))
a6 = Availability.create(coach: mace, start_time: DateTime.now + 2.days)
a7 = Availability.create(coach: yoda, start_time: DateTime.now - 1)
a8 = Availability.create(coach: yoda, start_time: (DateTime.now + 5.days))
e1 = Event.create(availability: a1, name: "Hello There", student: ani)
e2 = Event.create(availability: a2, name: "I have the high ground", student: ani)
e3 = Event.create(availability: a3, name: "Use the Force", student: luke)
r1 = Report.create(score: 5, notes: "The force is strong with this one.", event: e1)
