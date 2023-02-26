
# For referrence, following:
# https://simpleisbetterthancomplex.com/tutorial/2016/08/02/how-to-split-views-into-multiple-files.html

# This file exists to import all views from here so that we can import all views from here in the urls.py file,
# Instead of manually importing each one...
# + I can put notes here so that's cool

from .auth    import *
from .flights import *
"""
### All required views by category (different category in each file) ###



*Admin has user grup but not necessarily customer...
(even though he probably should be able to access it)


--> Authentication
(POST)   /api/auth/register              [ Guest       ] -- Register a new User account
(POST)   /api/auth/login                 [ Guest       ] -- Login to an existing    (User/Admin) account
(POST)   /api/auth/logout                [ User        ] -- Logout from an existing (User/Admin) account


--> Flights
(GET)    /api/flights/                   [ User, Guest ] -- Get all flights by params
(GET)    /api/flights/<flight_id>/       [ User, Guest ] -- Get a specific flight by flight id (to show the details of the flight in the UI)
(GET)    /api/flights/location/          [ User, Guest ] -- Get all available countries, cities of airports to display in "from:" & "to:" dropdown in UI\


--> Users
(DELETE) /api/users/<user_id>/           [ Admin       ] -- Delete a user by user id
(GET)    /api/users/<user_id>/flights    [ Admin       ] -- Get all user's flights by user id


--> Tickets
(POST)   /api/tickets/book/<flight_id>   [ User        ] -- Create a new ticket by flight id
(POST)   /api/tickets/cancel/<ticket_id> [ User        ] -- Cancel a ticket by ticket id
(DELETE) /api/tickets/delete/<flight_id> [ Admin       ] -- Delete a ticket forcefully by flight id



"""
