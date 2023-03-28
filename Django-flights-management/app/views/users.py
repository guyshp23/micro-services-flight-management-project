from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.model_not_found import ModelNotFoundException
from app.serializer.users_serializer import UserSerializer
from app.services.users_service import UsersService


class UserActions(APIView):
    serializer_class = UserSerializer

    def delete(self, request, user_id):
        """
        Delete the user by the user id (used by admins).
        """
        try:
            UsersService.delete_user(user_id)

            return Response(status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)

    def get(self, request, user_id):
        """
        Get the user details by the user id.
        """
        try:
            user       = UsersService.get_user_by_id(self, user_id)
            serializer = self.serializer_class(user, many=False)

            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except ValueError as e:
            return ExceptionsFactory.handle(e)


    def put(self, request, user_id):
        """
        Update the user details by the user id.
        """
        try:
            user       = UsersService.update_user(self, request, user_id)
            serializer = self.serializer_class(user, many=False)

            return Response(serializer.data, status=204)
        except Exception as e:
            return ExceptionsFactory.handle(e)
