from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.model_not_found import ModelNotFoundException
from app.facades.administrator_facade import AdministratorFacade
from app.facades.base_facade import BaseFacade
from app.serializer.users_serializer import UsersSerializer


class DeleteUser(APIView):
    def delete(self, request, user_id):
        try:
            # Delete the user.
            AdministratorFacade.delete_user(self, user_id)

            # Return the user flights.
            return Response(status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)

class GetUserByID(APIView):
    serializer_class = UsersSerializer

    def get(self, request, user_id):
        try:
            # Get the user flights.
            user       = BaseFacade.get_user_by_id(self, user_id)
            serializer = self.serializer_class(user, many=False)

            # Return the user flights.
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except ValueError as e:
            return ExceptionsFactory.handle(e)
