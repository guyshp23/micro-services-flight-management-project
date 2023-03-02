from .base_service_interface import BaseServiceInterface
from rest_framework_simplejwt.tokens import RefreshToken


class UsersService(BaseServiceInterface):
    # def authenticate(self, username: str, password: str):
    #     pass

    def logout(self, refresh_token: str) -> bool:
        """
        Logs out the user by blacklisting the refresh token provided in the request.

        Raises:
            TokenError: If the given token is invalid, expired, or otherwise not safe to use.

        Returns:
            bool: True if the token was successfully blacklisted, False otherwise.

        """
        token = RefreshToken(refresh_token)

        # check if the token is invalid
        if token.blacklisted:
            return False

        # raise a TokenError with a user-facing error message if the
        # given token is invalid, expired, or otherwise not safe to use.
        token.check_blacklist()

        return token.blacklist()
