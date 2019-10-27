# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user1 = User.create({name: "Ahana", email: "test@test.com", password: "password"})

user1.transactions.create({amount: 10, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 15, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 20, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 30, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 35, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 42, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 68, category: "Recreation", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})

user1.transactions.create({amount: 10, category: "Rideshare", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 12, category: "Rideshare", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 7, category: "Rideshare", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 5, category: "Rideshare", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})

user1.transactions.create({amount: 20, category: "Food and Drink", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 35, category: "Food and Drink", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 5, category: "Food and Drink", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})
user1.transactions.create({amount: 15, category: "Food and Drink", location: "Toronto", transaction_date: "2019-10-26T22:05:55.552Z"})



