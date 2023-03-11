# from exceptions.model_not_found import ModelNotFoundException
from rest_framework.views  import Response
from rest_framework_simplejwt.exceptions import TokenError

class ExceptionsFactory():
    def transform_exception(e: Exception) -> dict:
        # Handle the exception.
        
        # Take care of built-in exceptions that cannot/shouldn't be overwritten
        # And set their required fields here so they will be processed properly
        if isinstance(e, TokenError):
            e.status_code = 400
            e.message     = "The sent token is invalid"

        # A custom exception.
        return {
            "object":      "error",
            "message":     e.message,
            "status_code": e.status_code,
        }

    def handle(e: Exception) -> Response:
        """
        A factory to handle the given exception and return the appro. object.

        Args:
            exception: The Exception to handle.

        Returns:
            An object with the following attributes
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

        # Check if the given exception is an instance of Exception.
        # TODO: Test this
        if not isinstance(e, Exception):
            raise Exception("The given exception is not an instance of Exception.")

        # Get the appro. error object.
        error_object = ExceptionsFactory.transform_exception(e)

        # Return the appro. error object.
        return Response(error_object, status=error_object["status_code"])
