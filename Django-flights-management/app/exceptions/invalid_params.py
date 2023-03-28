class InvalidParamsException(Exception):
    """
    Exception raised when invalid params were recieved.
    """

    def __init__(self, custom_msg):
        """
        Holds the exception's custom attributes
        """
        self.status_code = 400
        self.message     = "The given parameters are invalid. Please double-check that you've set them correctly."
        self.custom_msg  = custom_msg
