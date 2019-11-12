# Budgey

Budgey is a gamified monthly budgetting app that helps users keep track and visualize their frivolous spending.

##### We are currently looking to convert this app into a mobile application via Apache's Cordova. In the meantime, when viewing this app in the browser please do so in mobile view.

## Motivation

During bootcamp most of our time was spent coding at Lighthouse Labs, and this left us with very little time to meal prep or cook at home. As a consequence our Ritual, McDonald's and Dollar Store bills quickly raked up. This was our inspiration for creating an app that could easily convey to us how much money we were spending per day/month and how much we could actually spend based on our monthly incomes (read limited monthly income).

## Contributors

[Ahana Ghosh](https://github.com/ahana15), [Nikita Sheremet](https://github.com/nikitasheremet), Cindy Halim

## Tech/Framework

Our Stack:
React.js/Material UI < Ruby on Rails < PostgreSQL

Libraries:
- SASS
- Axios
- Moment
- Carrierwave
- Rack CORS
- Bcrypt
- Faker

## Features

- **Clear break down of spending:** Users' monthly budget is further broken down to a daily budget.

![gif showing app features - dashboard - edit a goal](https://github.com/cindyhalim/budget-app/blob/master/assests/video1.gif)

- **Side goals:** Saving for a trip? A new phone? Users can add side goals and Budgey will re-analyze their daily progress to cover for those side goals.

![gif showing app features - dashboard - transaction added](https://github.com/cindyhalim/budget-app/blob/master/assests/video2.gif)

- **Analytics:** Users can view their monthly breakdown based on categories, compare their current spending with their previous months', as well as compare budget trends throughout the year.

![gif showing app features - analytics](https://github.com/cindyhalim/budget-app/blob/master/assests/video3.gif)

- **Gamified:** Users lose health points when they don't meet their monthly budget and earn coins when they do. They can purchase potions to revive their health and earn badges when they've met their budget for more than 1 month.

![gif showing app features - store - add hp](https://github.com/cindyhalim/budget-app/blob/master/assests/video4.gif)

## Installations
1. cd to the front-end directory (budget-frontend)
2. Install dependencies via `npm install`
3. Run the development server via `npm start`
4. Head to http://localhost:8080 on the browser

### Notes
- Our backend is hosted on Heroku, which takes a few seconds to 'warm-up'
- Test User: email: test@test.com; password: password

