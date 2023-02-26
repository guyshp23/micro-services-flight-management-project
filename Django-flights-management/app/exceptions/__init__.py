# # from exceptions.model_not_found import ModelNotFoundException


# def transform_exception(e: Exception) -> dict(str, str, int):
#     """
#     A factory to transform the given exception to a formated error object to later return in the view.

#     Args:
#         exception: The exception to transform.

#     Returns:
#         An object with the following attributes
#             - object:  The object's type. In this case: "error".
#             - message: The error message.
#             - description: Possible solutions, for example:
#                            If the error was 404, the description will be:
#                            "The requested resource was not found. Make sure it exists and try again."
#             - status_code: The status code.

#             For example:
#                 {
#                     "object": "error",
#                     "status_code": 404,
#                     "message": "The requested resource was not found. Make sure it exists and try again.",
#                 }
#     """
#     # TODO: Check if all exceptions are instances of Exception.
#     #       If so, find a way to find out when it is the regular Exception instance and when it is a custom exception.
#     #
#     # Handle the exception.
#     if isinstance(e, Exception):
#         # A general exception was thrown
#         return {
#             "object":      "error",
#             "status_code": 500,
#             "message":     str(e),
#         }
#     else:
#         # A custom exception.
#         return {
#             "object":      "error",
#             "status_code": e.status_code,
#             "message":     e.message,
#         }
