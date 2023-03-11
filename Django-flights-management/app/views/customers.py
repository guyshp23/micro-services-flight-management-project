from rest_framework.views  import APIView, Response
from app.exceptions.model_not_found import ModelNotFoundException
from app.facades.base_facade import BaseFacade
from app.serializer.flights_serializer import FlightsSerializer

class GetCustomerFlights(APIView):
    serializer_class = FlightsSerializer
 
    def get(self, request, customer_id):
        try:
            # Get the user flights.
            customer_flights = BaseFacade.get_all_customer_flights(self, customer_id)
            serializer       = self.serializer_class(customer_flights, many=True)

            # Return the user flights.
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return Response(str(e), status=404)
