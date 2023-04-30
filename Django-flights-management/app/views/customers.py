from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.model_not_found import ModelNotFoundException
from app.serializer.flights_serializer import FlightsSerializer
from app.services.customers_service import CustomersService
from app.services.flights_service import FlightService
from rest_framework import mixins, generics
from app.models import Customer
from app.serializer.customers_serializer import CustomerSerializer


class CustomerRUD(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.DestroyModelMixin,
                      mixins.UpdateModelMixin,
                      generics.GenericAPIView):
    
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self,request, *args , **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class CustomerList(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class GetCustomerFlights(APIView):
    serializer_class = FlightsSerializer
 
    def get(self, request, customer_id):
        try:
            # Get the user flights.
            customer_flights = FlightService.get_all_customer_flights(self, customer_id)
            serializer       = self.serializer_class(customer_flights, many=True)

            # Return the user flights.
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)

class CheckMe(APIView):
    """
    Checks if the current user is a customer by the request user id 
    """
    serializer_class = CustomerSerializer
 
    def post(self, request):
        try:
            user_id    = request.user.id
            customer   = CustomersService.check_if_user_is_a_customer(user_id)
            serializer = self.serializer_class(customer)

            # Return the user flights.
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)
