from rest_framework.views import APIView
from rest_framework.response import Response
from app.serializer.airport_serializer import AirportSerializer
from app.services.flights_service import FlightService

class GetAllAirportLocations(APIView):
    serializer_class = AirportSerializer

    def get(self, request):
        # Get the query param
        query = request.GET.get("query", None)

        try:
            airports   = FlightService.get_all_airports_display_name_by_query(self, query)
            serializer = self.serializer_class(airports, many=True)

            return Response(serializer.data, status=200)
        except Exception as e:
            return Response(str(e), status=500)
