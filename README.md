
# React Rails Calendar

### Beaker capstone project

An event scheduling calendar app that mimics functionality of Google calendar. Navigate with a main calendar and a small side calendar, filter events by label, and full CRUD operations utilizing PostgreSQL database.

[Link to the live site.](https://react-rails-calendar.herokuapp.com/ "React Rails calendar hosting on Heroku")

***

## Technologies Used

### React
React front end based on [this tutorial project by YouTube user Esteban Codes](https://youtu.be/KUKyTRYGrnU "Google Calendar Clone with React").
- React Hooks used include: `useState, useEffect, useReducer, useMemo, useContext`
- React Context provides global state management across application.
- Axios utilized to communicate with backend.

### Ruby on Rails
User auth and event api implemented in Rails.
 - User auth architecture controls sessions and uses CSRF tokens for authentication of requests.
 - Event API manages CRUD operations
 - Event and User models related via `belongs_to` and `has_many` associations, creating a one-to-many relationship.

### Webpacker
Webpacker gem implemented to facilitate build process for deployment of integrated front end and back end.


