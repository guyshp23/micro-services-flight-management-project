from .base_service_interface import BaseServiceInterface
from rest_framework_simplejwt.tokens import RefreshToken


class UsersService(BaseServiceInterface):
    # def authenticate(self, username: str, password: str):
    #     pass
    
    def logout(self, refresh_token: str):
        """
        Logs out the user by blacklisting the refresh token provided in the request.
        """
        token = RefreshToken(refresh_token)
        token.blacklist()
