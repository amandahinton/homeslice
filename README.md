# Homeslice

Homeslice is an app for homeowners to manage maintenance and repair (M+R) activities for their home/s. Users can subscribe to suggested routine M+R events or create their own custom tasks. Now homeowners can stay on top of the recurring needs of the property—-from roof inspection to gutter cleaning to appliance upkeep—-extending and protecting the value and safety of their home.

Homeslice can be found at: https://homeslice.app

## Development
* You can read more about the project using the wiki located at: https://github.com/amandahinton/homeslice
* To start a development environment:
  1. Clone the repository at: https://github.com/amandahinton/homeslice
  2. Run the command "npm install" inside both the frontend and backend directories to install dependencies
  3. Run the command "npm start" from both the frontend and backend directories to launch the servers

## Technologies Used
* JavaScript
* Express
* React
* Redux
* Thunk
* Node.js
* HTML
* CSS
* Postgres
* Sequelize
* Render (web hosting) + Neon (Postgres hosting)
* Git + Github

##  Features
See full feature list, user stories, and more at: https://github.com/amandahinton/homeslice/wiki
* Users
  * User signup, login/logout authentication, demo, and authorization to perform operations throughout the site
  * Bcrypt password hashing and protection from csurf attacks
* Homes
  * One user has one or more homes, which is the recipient of one or more bookings
* Events (possible tasks)
  * A list of suggested events can be browsed by the user
  * An event may have one or more categories
* Bookings (tasks)
  * Users can view, add, edit, or delete bookings for their home
  * Users can also create a custom booking from an event template

## Database Structure
![](https://github.com/amandahinton/homeslice/blob/main/design/database/database_schema.png)

## Style Guide
![](https://github.com/amandahinton/homeslice/blob/main/design/homeslice_brand_style.png)

## Challenges and Learnings
* Learning Redux and Thunk on the fly, as needed to implement
* Limited time constraints: build an app in one week
* Waiting until all of the required data has been returned before using it
* Managing state
* Using Heroku for Postgres database

## Created by [Amanda Hinton](https://github.com/amandahinton)
