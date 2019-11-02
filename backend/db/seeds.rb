# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user1 = User.create({name: "Ahana", email: "test@test.com", password: "password"})

#Recreation November
user1.transactions.create({amount: 10, category: "Recreation", location: "Toronto", transaction_date: "2019-11-01T10:35:17.552Z"})
user1.transactions.create({amount: 15, category: "Recreation", location: "Toronto", transaction_date: "2019-11-01T10:05:55.552Z"})

#Recreation October
user1.transactions.create({amount: 10, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 15, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 20, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 30, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 35, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 42, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 68, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})

#Recreation August
user1.transactions.create({amount: 10, category: "Recreation", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})
user1.transactions.create({amount: 15, category: "Recreation", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})
user1.transactions.create({amount: 20, category: "Recreation", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})
user1.transactions.create({amount: 30, category: "Recreation", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})


#RideShare November
user1.transactions.create({amount: 10, category: "Rideshare", location: "Toronto", transaction_date: "2019-11-01T10:35:17.552Z"})
user1.transactions.create({amount: 12, category: "Rideshare", location: "Toronto", transaction_date: "2019-11-01T10:35:17.552Z"})

#RideShare October
user1.transactions.create({amount: 10, category: "Rideshare", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 12, category: "Rideshare", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 7, category: "Rideshare", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 5, category: "Rideshare", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
#
#RideShare August
user1.transactions.create({amount: 20, category: "Rideshare", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})
user1.transactions.create({amount: 22, category: "Rideshare", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})

#Food and Drink November
user1.transactions.create({amount: 20, category: "Food and Drink", location: "Toronto", transaction_date: "2019-11-01T10:35:17.552Z"})
user1.transactions.create({amount: 35, category: "Food and Drink", location: "Toronto", transaction_date: "2019-11-01T10:35:17.552Z"})

#Food and Drink October
user1.transactions.create({amount: 20, category: "Food and Drink", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 35, category: "Food and Drink", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 5, category: "Food and Drink", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 15, category: "Food and Drink", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})

#Food and Drink August
user1.transactions.create({amount: 20, category: "Food and Drink", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})
user1.transactions.create({amount: 35, category: "Food and Drink", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})

#Shopping November
user1.transactions.create({amount: 15, category: "Shopping", location: "Toronto", transaction_date: "2019-11-01T10:35:17.552Z"})
user1.transactions.create({amount: 25, category: "Shopping", location: "Toronto", transaction_date: "2019-11-01T10:35:17.552Z"})

#Shopping October
user1.transactions.create({amount: 15, category: "Shopping", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 25, category: "Shopping", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 75, category: "Shopping", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 15, category: "Shopping", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})

#Shopping August
user1.transactions.create({amount: 15, category: "Shopping", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})
user1.transactions.create({amount: 25, category: "Shopping", location: "Toronto", transaction_date: "2019-08-26T22:05:55.552Z"})

#goals

user1.goals.create({end_date: nil, goal_type: "budget", amount: 1000, name: "budget"})
user1.goals.create({end_date: nil, goal_type: "budget", amount: 2000, name: "budget"})
user1.goals.create({end_date: nil, goal_type: "budget", amount: 1500, name: "budget"})
user1.goals.create({end_date: nil, goal_type: "budget", amount: 3000, name: "budget"})
user1.goals.create({end_date: nil, goal_type: "budget", amount: 3500, name: "budget"})
user1.goals.create({end_date: nil, goal_type: "budget", amount: 700, name: "budget"})

user1.goals.create({start_date:"2019-10-01T10:35:17.552Z" , end_date: "2019-11-30T10:35:17.552Z", goal_type: "saving", amount: 400, name: "new phone"})
user1.goals.create({start_date:"2019-11-21T10:35:17.552Z" , end_date: "2019-12-03T10:35:17.552Z", goal_type: "saving", amount: 300, name: "new watch"})
