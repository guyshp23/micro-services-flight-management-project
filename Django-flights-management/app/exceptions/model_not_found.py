class ModelNotFoundException(Exception):
    """
    Exception raised when a model is not found in the database.
    """

    def __init__(self):
        """
        Holds the exception's status code
        """
        self.status_code = 404
        self.message     = "The requested resource was not found. Make sure it exists and try again."

    def object(self):
        """
        Returns the exception's object.

        Returns:
            - The exception's object.
              Includes the following:
                - object: The object's name.
                - status_code: The status code.
                - message: The error message.

                For example:
                    {
                        "object": "error",
                        "status_code": 404,
                        "message": "The requested resource was not found. Make sure it exists and try again.",
                    }
        """
        return {
            "object":      "error",
            "status_code": self.status_code,
            "message":     self.message,
        }
