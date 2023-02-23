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
