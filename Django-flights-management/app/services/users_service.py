from app.exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import User

class UsersService(BaseServiceInterface):

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


    def delete_user(self, user_id: int) -> bool:
        """
        Deletes the user with the given ID.

        Args:
            user_id (int): The ID of the user to delete.
        
        Raises:
            ModelNotFoundException: If the user with the given ID doesn't exist.

        Returns:
            bool: True if the user was successfully deleted, False otherwise.
        """

        # Check if the user exists
        user = User.objects.filter(id=user_id).first()

        if user is None:
            raise ModelNotFoundException("User with ID " + str(user_id) + " doesn't exist.")

        # Delete the user.
        return user.delete()


    def get_user_by_id(self, user_id: int) -> User:
        """
        Gets the user with the given ID.

        Args:
            user_id (int): The ID of the user to get.

        Raises:
            ModelNotFoundException: If the user with the given ID doesn't exist.

        Returns:
            User: The user with the given ID.

        """

        # Get the user.
        user = User.objects.filter(id=user_id).first()

        if user is None:
            raise ModelNotFoundException("User with ID " + str(user_id) + " doesn't exist.")

        return user


    def does_user_exist(user_id: int) -> None:
        """
        Checks if the user with the given ID exists.
        (use in internal functions to check if the given user_id arg is valid)

        Args:
            user_id (int): The ID of the user to check.
        
        Raises:
            ModelNotFoundException: If the user with the given ID doesn't exist.
        """

        # Check if the user exists
        user = User.objects.filter(id=user_id).first()

        if user is None:
            raise ModelNotFoundException('User not found with ID: ' + str(user_id))
