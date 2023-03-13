from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.model_not_found import ModelNotFoundException
from app.serializer.users_serializer import UserSerializer
from app.services.users_service import UsersService


class DeleteUser(APIView):
    def delete(self, request, user_id):
        try:
            # Delete the user.
            UsersService.delete_user(user_id)

            # Return the user flights.
            return Response(status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)

class GetUserByID(APIView):
    serializer_class = UserSerializer

    def get(self, request, user_id):
        try:
            # Get the user flights.
            user       = UsersService.get_user_by_id(self, user_id)
            serializer = self.serializer_class(user, many=False)

            # Return the user flights.
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except ValueError as e:
            return ExceptionsFactory.handle(e)
