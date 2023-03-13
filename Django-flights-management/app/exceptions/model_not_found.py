class ModelNotFoundException(Exception):
    """
    Exception raised when a model is not found in the database.
    """

    def __init__(self, custom_msg):
        """
        Holds the exception's custom attributes
        """
        self.status_code = 404
        self.message     = "The requested resource was not found. Make sure it exists and try again."
        self.custom_msg  = custom_msg
