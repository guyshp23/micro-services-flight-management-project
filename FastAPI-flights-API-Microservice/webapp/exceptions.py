#  A list of exceptions that will be raised when something goes wrong
# TODO: Add an init function to all exceptions and hold 
#       the status_code, custom message, etc. in self variables
#       Just like in the Django exceptions, create a factory as well for handling in the views.


class FlightNotFoundException(Exception):
    """
     The requested model does not exist in the database
     Usage Example: Trying to get/delete a flight that doesn't exist
    
    :status_code: 404
    """
    pass


class FlightNotFoundException(Exception):
    """
     Trying to get a flight or delete a flight that doesn't exist
    
    :status_code: 409
    """
    pass


class InvalidParametersWereProvidedInRequestException(Exception):
    """
     The requirements parameters was not provided in the request body
     Usage Example: The user is trying to get a flight with invalid parameters
 
    :status_code: 402
    """
    pass

class AirportNotFoundException(Exception):
    """
     Thrown when the airport wasn't found in the local database
     but was mentioned in the external api request

     :status_code: 404
    """
    pass

