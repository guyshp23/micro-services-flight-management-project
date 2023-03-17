from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.model_not_found import ModelNotFoundException
from app.serializer.flights_serializer import FlightsSerializer
from app.services.customers_service import CustomersService
from app.services.flights_service import FlightService


class CustomerActions(APIView):
    def get(self, request, customer_id):
        """
        Get the customer details by the customer_id
        """
        try:
            user       = CustomersService.get_user_by_id(self, customer_id)
            serializer = self.serializer_class(user, many=False)

            return Response(serializer.data, status=200)
        except Exception as e:
            return ExceptionsFactory.handle(e)
    
    def delete(self, request, customer_id):
        """
        Delete the customer by the customer_id
        """
        try:
            CustomersService.delete_customer(customer_id)

            return Response(status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)


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
