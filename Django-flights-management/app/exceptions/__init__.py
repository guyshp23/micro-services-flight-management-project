from ast import Tuple

from h11 import Response


def transform_exception(e: Exception) -> dict(str, str, int):
    """
    A factory to transform the given exception to a formated error message.

    Args:
        exception: The exception to transform.

    Returns:
        An object with the following attributes
            - message: The error message.
            - description: Possible solutions, for example:
                           If the error was 404, the description will be:
                           "The requested resource was not found. Make sure it exists and try again."
            - status_code: The status code.
    """
    # Handle the exception.
    if isinstance(e, Exception):
        
        # get the exception's message
        message = str(e)

        # get the exception's status code
        status_code = 400

        # get the exception's description
        description = "An error occurred. Please try again later."

        # return the exception's message, description and status code
        return message, description, status_code

    


# def handle(exception: Exception) -> Response():
#     """
#     Handle the given exception.

#     Args:
#         exception: The exception to handle.

#     Returns:
#         A tuple with the error message and the status code.
#     """
    
#         # Handle the exception.
#         if isinstance(exception, Exception):
            