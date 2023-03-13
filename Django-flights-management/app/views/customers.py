from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.model_not_found import ModelNotFoundException
from app.serializer.flights_serializer import FlightsSerializer
from app.services.flights_service import FlightService

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
