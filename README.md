# Homeslice

Homeslice is an app for homeowners to manage maintenance and repair (M+R) acitivities for their home/s. Users can subscribe to suggested routine M+R events or create their own custom ones. Now homeowners can stay on top of the recurring needs of the property—from roof inspection to gutter cleaning to appliance upkeep—extending and protecting the value and safety of their property. 

Homeslice can be found at: https://homesliceapp.herokuapp.com/

## Development
* You can read more about the project using the wiki located at: https://github.com/amandahinton/homeslice
* To start a development environment:
  1. Clone the repository at: https://github.com/amandahinton/homeslice
  2. Run the command "npm install" from the project root in your terminal to install dependencies
  3. Run the command "npm start" to launch the server
  4. Navigate to the localhost port specified in config/index.js

## Technologies Used
* Javascript
* Express
* React
* Redux
* Thunk
* Node.js
* HTML
* CSS
* Postgres
* Sequelize
* Heroku
* Git + Github

##  Features
* Users
  * User functionality including registration, Login/Logout authentication, and authorization to perform different CRUD operations throughout the site.
  * The Bcrypt hashing algorithm is used to maintain password security
  * All forms are protected against csurf attacks
* Homes
  * One user has one or more homes, which is the recipient of one or more bookings
* Bookings
  * Authenticated Users can book an event for their home
  * Authenticated users can delete or update their home's bookings
  * When an event is completed, it can be rescheduled at the specified recurrence (number of days later)
  * Bookings display in chronological order, so user can quickly see their next upcoming event
* Events
  * A list of suggested events can be browsed by the user
  * Authenticated users can create custom events and subscribe to it (booking) for their home
* Categories
  * An event may have one or more categories 

## Challenges and Learnings

## Code Highlights

## Database Structure
![](https://github.com/amandahinton/homeslice/blob/main/design/database/homeslice_schema.png)

## Created by [Amanda Hinton](https://github.com/amandahinton)

