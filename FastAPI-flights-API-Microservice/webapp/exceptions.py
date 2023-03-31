#  A list of exceptions that will be raised when something goes wrong
# TODO: Add an init function to all exceptions and hold 
#       the status_code, custom message, etc. in self variables
#       Just like in the Django exceptions, create a factory as well for handling in the views.


from fastapi import Response
from fastapi.responses import JSONResponse


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
    def __init__(self, custom_msg: str) -> None:
        self.status_code = 404
        self.custom_msg  = custom_msg
    pass


class InvalidParamsException(Exception):
    """
     The requirements parameters were not provided
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



class ExceptionsFactory():
    def transform_exception(e: Exception) -> dict:
        """
        Transform the given exception to an error object.
        Turns the Exception python object into a dictionairy. Will take care of
        unhandled/built-in exceptions locally that were forgetten/shouldn't be
        overwritten and assigns them a 'general error' 500 status code and a
        general error message if necessary.

        Params:
            e: The Exception to transform.

        Raises:
            None

        Returns:
            A dict representing the error object.
        """
        
        # Take care of built-in exceptions that cannot/shouldn't be overwritten
        # And set their required fields here so they will be processed properly
        if isinstance(e, ValueError):
            e.status_code = 400
            e.message     = "The given value is invalid"
        if isinstance(e, TypeError):
            e.status_code = 400
            e.message     = "The given type is invalid"
        if isinstance(e, AttributeError):
            e.status_code = 404
            e.message     = "The given attribute is invalid"

        # Incase where the exception was forgetten to be handled/shouldn't be.
        # Report it in log as a warning and assign it a 500 status code for now
        if not hasattr(e, 'status_code'):
            e.status_code = 500

        if not hasattr(e, 'message'):
            e.message     = "Something went wrong"
            # TOLOG: warning, unassigned status_code & message to exception

        if not hasattr(e, 'custom_msg'):
            e.custom_msg = str(e)


        
        # TOLOG: Log the exception here as an error
        return {
            "object":         "error",
            "message":        e.message,
            "custom_message": e.custom_msg,
            "status_code":    e.status_code,
        }


    def handle(e: Exception) -> Response:
        """
        A factory to handle the given exception and return the appro. object.

        Args:
            exception: The Exception to handle.

        Returns:
            A JSON response with the following attributes
                - object:  The object's type. In this case: "error".
                - message: The error message.
                - description: Possible solutions, for example:
                            If the error was 404, the description will be:
                            "The requested resource was not found. Make sure it exists and try again."
                - status_code: The status code.

                For example:
                    {
                        "object": "error",
                        "status_code": 404,
                        "message": "The requested resource was not found. Make sure it exists and try again.",
                    }
        """

        try:
            # Check if the given exception is an instance of Exception.
            # TODO: Test this, send something other than an exception and see if it raises an error
            if not isinstance(e, Exception):
                raise InvalidParamsException("The given exception is not an instance of Exception.")

            # Get the appro. error object.
            error_object = ExceptionsFactory.transform_exception(e)

            print('statuc ode', error_object["status_code"])
            # Return the appropriate error object.
            return JSONResponse(error_object, status_code=error_object["status_code"])
        except InvalidParamsException as e:
            # TODO: Test this
            return ExceptionsFactory.transform_exception(e)
