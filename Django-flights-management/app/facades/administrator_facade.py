from app.services.users_service import UsersService
from .base_facade import BaseFacade

class AdministratorFacade(BaseFacade):
    def delete_user(self, user_id: int):
        return UsersService.delete_user(user_id)
