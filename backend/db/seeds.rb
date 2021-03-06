# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

user1 = User.create({name: "Ahana", email: "test@test.com", password: "password", hp: 60, coins: 180, num_times_bud_met: 9, date_last_checked: '2019-11-07'})

#Recreation November
(1..5).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-11-04T10:35:17.552Z"})
end
# #Recreation November
# (1..20).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-11-01T10:35:17.552Z"})
# end
# #Recreation November
# (1..20).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-11-01T10:35:17.552Z"})
# end
# #Recreation November
# (1..20).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-11-01T10:35:17.552Z"})
# end

#Recreation October
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-10-01T10:35:17.552Z"})
end

#Recreation September
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-09-01T10:35:17.552Z"})
end
#Recreation August
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-08-01T10:35:17.552Z"})
end
#Recreation July
(1..20).each do 
    user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-07-01T10:35:17.552Z"})
end
#Recreation June
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-06-01T10:35:17.552Z"})
end
#Recreation May
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-05-01T10:35:17.552Z"})
end
#Recreation April
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-04-01T10:35:17.552Z"})
end
#Recreation March
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-03-01T10:35:17.552Z"})
end
#Recreation February
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-02-01T10:35:17.552Z"})
end
#Recreation January
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 1.00, to: 20.99), category: "Recreation", location: Faker::Artist.name, transaction_date: "2019-01-01T10:35:17.552Z"})
end


#RideShare November
(1..5).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-11-01T10:35:17.552Z"})
end
# #RideShare November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-11-01T10:35:17.552Z"})
# end
# #RideShare November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-11-01T10:35:17.552Z"})
# end
# #RideShare November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-11-01T10:35:17.552Z"})
# end

#RideShare October
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-10-01T10:35:17.552Z"})
end

#RideShare September
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-09-01T10:35:17.552Z"})
end

#RideShare August
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-08-01T10:35:17.552Z"})
end

#RideShare July
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-07-01T10:35:17.552Z"})
end

#RideShare June
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-06-01T10:35:17.552Z"})
end

#RideShare May
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-05-01T10:35:17.552Z"})
end

#RideShare April
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-04-01T10:35:17.552Z"})
end

#RideShare March
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-03-01T10:35:17.552Z"})
end

#RideShare February
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-02-01T10:35:17.552Z"})
end

#RideShare January
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 5.00, to: 15.99), category: "Rideshare", location: "Uber", transaction_date: "2019-01-01T10:35:17.552Z"})
end

#Food and Drink November
(1..5).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-11-01T10:35:17.552Z"})
end
# #Food and Drink November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-11-10T10:35:17.552Z"})
# end
# #Food and Drink November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-11-16T10:35:17.552Z"})
# end
# #Food and Drink November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-11-26T10:35:17.552Z"})
# end

#Food and Drink October
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-10-26T22:05:55.552Z"})
end

#Food and Drink September
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-09-26T22:05:55.552Z"})
end

#Food and Drink August
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-08-26T22:05:55.552Z"})
end

#Food and Drink July
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-07-26T22:05:55.552Z"})
end

#Food and Drink June
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-06-26T22:05:55.552Z"})
end

#Food and Drink May
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-05-26T22:05:55.552Z"})
end

#Food and Drink April
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-04-26T22:05:55.552Z"})
end

#Food and Drink March
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-03-26T22:05:55.552Z"})
end

#Food and Drink February
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-02-26T22:05:55.552Z"})
end

#Food and Drink January
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 3.00, to: 20.99), category: "Food and Drink", location: Faker::Restaurant.name, transaction_date: "2019-01-26T22:05:55.552Z"})
end


#Shopping November
(1..5).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-11-02T22:05:55.552Z"})
end
# #Shopping November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-11-15T22:05:55.552Z"})
# end
# #Shopping November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-11-20T22:05:55.552Z"})
# end
# #Shopping November
# (1..5).each do 
#   user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-11-29T22:05:55.552Z"})
# end


#Shopping October
(1..20).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-10-26T22:05:55.552Z"})
end

#Shopping September
(1..5).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-09-26T22:05:55.552Z"})
end
#Shopping August
(1..3).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-08-26T22:05:55.552Z"})
end
#Shopping July
(1..6).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-07-26T22:05:55.552Z"})
end
#Shopping June
(1..3).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-06-26T22:05:55.552Z"})
end
#Shopping May
(1..4).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-05-26T22:05:55.552Z"})
end
#Shopping April
(1..5).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-04-26T22:05:55.552Z"})
end
#Shopping March
(1..4).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-03-26T22:05:55.552Z"})
end
#Shopping February
(1..3).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-02-26T22:05:55.552Z"})
end
#Shopping January
(1..2).each do 
  user1.transactions.create({amount: Faker::Number.between(from: 10.00, to: 30.99), category: "Shopping", location: "The Bay", transaction_date: "2019-01-26T22:05:55.552Z"})
end

#goals

user1.goals.create({start_date: '2019-01-01T10:35:17.552Z', goal_type: "budget", amount: 1000, name: "budget"})
user1.goals.create({start_date: '2019-02-15T10:35:17.552Z', goal_type: "budget", amount: 900, name: "budget"})
user1.goals.create({start_date: '2019-03-15T10:35:17.552Z', goal_type: "budget", amount: 800, name: "budget"})
user1.goals.create({start_date: '2019-04-15T10:35:17.552Z', goal_type: "budget", amount: 700, name: "budget"})
user1.goals.create({start_date: '2019-05-15T10:35:17.552Z', goal_type: "budget", amount: 1000, name: "budget"})
user1.goals.create({start_date: '2019-06-15T10:35:17.552Z', goal_type: "budget", amount: 700, name: "budget"})
user1.goals.create({start_date: '2019-07-15T10:35:17.552Z', goal_type: "budget", amount: 600, name: "budget"})
user1.goals.create({start_date: '2019-08-15T10:35:17.552Z', goal_type: "budget", amount: 1000, name: "budget"})
user1.goals.create({start_date: '2019-09-15T10:35:17.552Z', goal_type: "budget", amount: 800, name: "budget"})
user1.goals.create({start_date: '2019-10-01T10:35:17.552Z', goal_type: "budget", amount: 1000, name: "budget"})
user1.goals.create({start_date: '2019-10-02T10:35:17.552Z', goal_type: "budget", amount: 1500, name: "budget"})
user1.goals.create({start_date: '2019-10-03T10:35:17.552Z', goal_type: "budget", amount: 900, name: "budget"})
user1.goals.create({start_date: '2019-11-25T10:35:17.552Z', goal_type: "budget", amount: 900, name: "budget"})

user1.goals.create({start_date:"2019-10-01T10:35:17.552Z" , end_date: "2019-12-01T10:35:17.552Z", goal_type: "saving", amount: 1500, name: "iPhone11"})
user1.goals.create({start_date:"2019-11-21T10:35:17.552Z" , end_date: "2019-12-03T10:35:17.552Z", goal_type: "saving", amount: 300, name: "Citizen Watch"})
user1.goals.create({start_date:"2019-11-01T10:35:17.552Z" , end_date: "2019-11-09T10:35:17.552Z", goal_type: "saving", amount: 10, name: "Fancy Rubber Duck"})

#badges

Badge.create({name: "badge1", path_name: "storage/straw.png"})
Badge.create({name: "badge3", path_name: "storage/stick.png"})
Badge.create({name: "badge5", path_name: "storage/brick.png"})
Badge.create({name: "badge10", path_name: "storage/wolf.png"})

#badges-users table
badge = Badge.first
badge2 = Badge.second
badge3 = Badge.third
badge4 = Badge.fourth
user1.badges << badge
user1.badges << badge2
user1.badges << badge3
user1.badges << badge4
