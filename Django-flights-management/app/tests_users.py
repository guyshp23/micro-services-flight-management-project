import pytest

from app.services.users_service import UsersService, InvalidParamsException, ModelNotFoundException

class TestUsersService:
    def test_register_new_user(self):
        service = UsersService()
        user = service.register("testuser", "testuser@example.com", "password")
        assert user is not None

        # Test registering the same user twice
        with pytest.raises(InvalidParamsException):
            service.register("testuser", "testuser2@example.com", "password2")

        # Test registering a user with the same email as the first user
        with pytest.raises(InvalidParamsException):
            service.register("testuser2", "testuser@example.com", "password2")

    def test_logout(self):
        service = UsersService()

        # Test logging out with a valid refresh token
        refresh_token = "valid_token"
        assert service.logout(refresh_token) is True

        # Test logging out with an invalid refresh token
        refresh_token = "invalid_token"
        assert service.logout(refresh_token) is False

    def test_delete_user(self):
        service = UsersService()

        # Test deleting an existing user
        user = service.register("testuser", "testuser@example.com", "password")
        assert service.delete_user(user.id) is True

        # Test deleting a non-existent user
        with pytest.raises(ModelNotFoundException):
            service.delete_user(123)

    def test_get_user_by_id(self):
        service = UsersService()

        # Test getting an existing user
        user = service.register("testuser", "testuser@example.com", "password")
        assert service.get_user_by_id(user.id) == user

        # Test getting a non-existent user
        with pytest.raises(ModelNotFoundException):
            service.get_user_by_id(123)

    def test_update_user(self):
        service = UsersService()

        # Test updating an existing user
        user = service.register("testuser", "testuser@example.com", "password")
        updated_user = service.update_user(user.id, {"first_name": "new_first_name"})
        assert updated_user.first_name == "new_first_name"

        # Test updating a non-existent user
        with pytest.raises(ModelNotFoundException):
            service.update_user(123, {"first_name": "new_first_name"})